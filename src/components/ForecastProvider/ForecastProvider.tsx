"use client";

import { useContext, createContext, PropsWithChildren } from "react";
import { API_KEY } from "@/helpers/constants";
import { LocationContext } from "../LocationProvider";
import { getDayNames } from "@/helpers/utils";
import { DailyForecast } from "@/typings/types";
import useSWR from "swr";

export const ForecastContext = createContext<number | any | boolean | null>(
  null
);

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function ForecastProvider({ children }: PropsWithChildren) {
  const location = useContext(LocationContext);
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 900000,
    revalidateOnFocus: false,
  });

  console.log(url);

  const weeklyForecast: DailyForecast[] = [];

  const dayNames = getDayNames();

  if (data) {
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
        dailyForecast.temp.current = data.current.temp;
      }

      weeklyForecast.push(dailyForecast);
    }
  }

  return (
    <ForecastContext.Provider value={{ weeklyForecast, error, isLoading }}>
      {children}
    </ForecastContext.Provider>
  );
}

export default ForecastProvider;
