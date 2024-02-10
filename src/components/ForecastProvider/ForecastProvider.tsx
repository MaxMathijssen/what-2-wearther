"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { API_KEY } from "@/helpers/constants";
import { LocationContext } from "../LocationProvider";
import { getDayNames, getCurrentTimestamp } from "@/helpers/utils";
import { DailyForecast } from "@/typings/types";
import useSWR from "swr";

export const ForecastContext = createContext<number | any | boolean | null>(
  null
);

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function ForecastProvider({ children }: PropsWithChildren) {
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[] | null>(
    null
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(
    null
  );

  function selectDailyForecast(dailyForecast: DailyForecast) {
    setDailyForecast(dailyForecast);
  }

  useEffect(() => {
    const storedWeeklyForecast = window.localStorage.getItem("weeklyForecast");

    if (storedWeeklyForecast) {
      try {
        const parsedWeeklyForecast = JSON.parse(storedWeeklyForecast);

        if (
          parsedWeeklyForecast &&
          Array.isArray(parsedWeeklyForecast) &&
          parsedWeeklyForecast.every(
            (item) =>
              typeof item === "object" &&
              "day" in item &&
              "temp" in item &&
              "weather" in item
          )
        ) {
          console.log("Parsed weeklyForecast", parsedWeeklyForecast);
          setWeeklyForecast(parsedWeeklyForecast);
        }
      } catch (error) {
        console.error("Error parsing stored weekly forecast:", error);
      }
    }
  }, []);

  const location = useContext(LocationContext);

  let shouldFetch: boolean = false;
  if (
    (weeklyForecast === null && location !== null) ||
    (weeklyForecast !== null &&
      getCurrentTimestamp() - weeklyForecast[0].dt > 1800)
  ) {
    shouldFetch = true;
  }

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`;
  const { data, error, isLoading } = useSWR(shouldFetch ? url : null, fetcher, {
    refreshInterval: 900000,
    revalidateOnFocus: false,
  });

  const newWeeklyForecast: DailyForecast[] = [];

  const dayNames = getDayNames();

  if (data && location !== null) {
    for (let i = 0; i < 7; i++) {
      const dailyForecast: DailyForecast = {
        dt: data.daily[i].dt,
        day: dayNames[i],
        temp: {
          min: data.daily[i].temp.min,
          max: data.daily[i].temp.max,
          morn: data.daily[i].temp.morn,
          day: data.daily[i].temp.day,
          night: data.daily[i].temp.night,
          eve: data.daily[i].temp.eve,
        },
        humidity: data.daily[i].humidity,
        feels_like: data.daily[i].feels_like,
        weather: data.daily[i].weather[0].main,
        clouds: data.daily[i].clouds,
        wind_speed: data.daily[i].wind_speed,
        wind_deg: data.daily[i].wind_deg,
        wind_gust: data.daily[i].wind_gust,
        pop: data.daily[i].pop,
        rain: data.daily[i].rain,
        uvi: data.daily[i].uvi,
      };

      if (i === 0) {
        dailyForecast.dt = data.current.dt;
        dailyForecast.temp.current = data.current.temp;
        dailyForecast.weather = data.current.weather.main;
        dailyForecast.feels_like = data.current.feels_like;
        dailyForecast.humidity = data.current.humidity;
        dailyForecast.clouds = data.current.clouds;
        dailyForecast.wind_speed = data.current.wind_speed;
        dailyForecast.wind_deg = data.current.wind_deg;
        dailyForecast.wind_gust = data.current.wind_gust;
      }
      newWeeklyForecast.push(dailyForecast);
    }

    if (newWeeklyForecast !== null) {
      console.log("Stored weeklyForecast", newWeeklyForecast);
      window.localStorage.setItem(
        "weeklyForecast",
        JSON.stringify(newWeeklyForecast)
      );
      setWeeklyForecast(newWeeklyForecast);
    }
  }

  if (isLoading) {
    console.log("SWR is fetching data...");
  }

  return (
    <ForecastContext.Provider
      value={{
        dailyForecast,
        weeklyForecast,
        selectDailyForecast,
        error,
        isLoading,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
}

export default ForecastProvider;
