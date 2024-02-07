"use client";

import { useContext, createContext, useState, PropsWithChildren } from "react";
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
    (): DailyForecast[] | null => {
      if (typeof window !== "undefined") {
        const storedWeeklyForecast =
          window.localStorage.getItem("weeklyForecast");

        if (storedWeeklyForecast) {
          try {
            const parsedWeeklyForecast = JSON.parse(storedWeeklyForecast);

            if (
              parsedWeeklyForecast &&
              Array.isArray(parsedWeeklyForecast) && // Ensure parsedWeeklyForecast is an array
              parsedWeeklyForecast.every(
                (item) =>
                  typeof item === "object" &&
                  "day" in item &&
                  "temp" in item &&
                  "weather" in item
              )
            ) {
              console.log("Parsed weeklyForecast", parsedWeeklyForecast);
              return parsedWeeklyForecast;
            }
          } catch (error) {
            console.error("Error parsing stored weekly forecast:", error);
          }
        }
        return null;
      }
      return null;
    }
  );

  const location = useContext(LocationContext);
  console.log(location);

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
    console.log(url);
    for (let i = 0; i < 7; i++) {
      const dailyForecast: DailyForecast = {
        dt: data.daily[i].dt,
        day: dayNames[i],
        temp: {
          min: data.daily[i].temp.min,
          max: data.daily[i].temp.max,
        },
        weather: data.daily[i].weather[0].main,
      };

      if (i === 0) {
        dailyForecast.dt = data.current.dt;
        dailyForecast.temp.current = data.current.temp;
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
    <ForecastContext.Provider value={{ weeklyForecast, error, isLoading }}>
      {children}
    </ForecastContext.Provider>
  );
}

export default ForecastProvider;
