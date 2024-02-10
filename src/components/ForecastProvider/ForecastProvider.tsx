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

  const getIconPath = (icon: string): string => {
    switch (icon) {
      case "01d":
        return "/01d@2x.png";
      case "01n.png":
        return "/01n@2x.png";
      case "02d.png":
        return "/02d@2x.png";
      case "02n.png":
        return "/02n@2x.png";
      case "03d.png":
        return "/03d@2x.png";
      case "03n.png":
        return "/03n@2x.png";
      case "04d.png":
        return "/04d@2x.png";
      case "04n.png":
        return "/04n@2x.png";
      case "09d.png":
        return "/09d@2x.png";
      case "09n.png":
        return "/09n@2x.png";
      case "10d.png":
        return "/10d@2x.png";
      case "10n.png":
        return "/10n@2x.png";
      case "11d.png":
        return "/11d@2x.png";
      case "11n.png":
        return "/11n@2x.png";
      case "13d.png":
        return "/13d@2x.png";
      case "13n.png":
        return "/13n@2x.png";
      case "50d.png":
        return "/50d@2x.png";
      case "50n.png":
        return "/50n@2x.png";
      default:
        return "error.png";
    }
  };

  if (data && location !== null) {
    for (let i = 0; i < 7; i++) {
      const dailyForecast: DailyForecast = {
        dt: data.daily[i].dt,
        day: dayNames[i],
        temp: {
          min: Math.round(data.daily[i].temp.min),
          max: Math.round(data.daily[i].temp.max),
          morn: Math.round(data.daily[i].temp.morn),
          day: Math.round(data.daily[i].temp.day),
          night: Math.round(data.daily[i].temp.night),
          eve: Math.round(data.daily[i].temp.eve),
        },
        humidity: Math.round(data.daily[i].humidity),
        feels_like: Math.round(data.daily[i].feels_like),
        weather: data.daily[i].weather[0].main,
        clouds: Math.round(data.daily[i].clouds),
        wind_speed: Math.round(data.daily[i].wind_speed),
        wind_deg: Math.round(data.daily[i].wind_deg),
        wind_gust: Math.round(data.daily[i].wind_gust),
        pop: Math.round(data.daily[i].pop),
        rain: Math.round(data.daily[i].rain),
        uvi: Math.round(data.daily[i].uvi),
        iconPath: getIconPath(data.daily[i].weather[0].icon),
      };

      if (i === 0) {
        dailyForecast.dt = Math.round(data.current.dt);
        dailyForecast.temp.current = Math.round(data.current.temp);
        dailyForecast.weather = data.current.weather.main;
        dailyForecast.feels_like = Math.round(data.current.feels_like);
        dailyForecast.humidity = Math.round(data.current.humidity);
        dailyForecast.clouds = Math.round(data.current.clouds);
        dailyForecast.wind_speed = Math.round(data.current.wind_speed);
        dailyForecast.wind_deg = Math.round(data.current.wind_deg);
        dailyForecast.wind_gust = Math.round(data.current.wind_gust);
        dailyForecast.iconPath = getIconPath(data.current.weather[0].icon);
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
