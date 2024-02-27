"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren,
} from "react";
import { LocationContext } from "../LocationProvider";
import { getCurrentTimestamp } from "@/helpers/utils";
import mapForecast from "@/helpers/mapForecast";
import { API_KEY, REFRESH_TIME_MIN } from "@/helpers/constants";
import { DailyForecast } from "@/typings/types";
import useSWR from "swr";

export const ForecastContext = createContext<number | any | boolean | null>(
  null
);

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function ForecastProvider({ children }: PropsWithChildren) {
  const [weeklyForecast, setWeeklyForecast] = useState<{
    location: string | undefined;
    forecast: DailyForecast[];
  } | null>(null);
  const [selectedDailyForecast, setSelectedDailyForecast] =
    useState<DailyForecast | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  function selectDailyForecast(dailyForecast: DailyForecast) {
    setSelectedDailyForecast(dailyForecast);
  }

  const { coordinates, updateSource, location } = useContext(LocationContext);

  useEffect(() => {
    const storedWeeklyForecast = window.localStorage.getItem("weeklyForecast");

    if (storedWeeklyForecast) {
      try {
        const parsedWeeklyForecast = JSON.parse(storedWeeklyForecast);

        if (parsedWeeklyForecast) {
          console.log("Parsed weeklyForecast", parsedWeeklyForecast);
          setWeeklyForecast(parsedWeeklyForecast);
          setSelectedDailyForecast(parsedWeeklyForecast.forecast[0]);
        }
      } catch (error) {
        console.error("Error parsing stored weekly forecast:", error);
      }
    }
  }, []);

  const checkFetchConditions = () => {
    if (
      (updateSource === "auto" &&
        weeklyForecast === null &&
        coordinates !== null) ||
      (updateSource === "auto" &&
        weeklyForecast !== null &&
        getCurrentTimestamp() - weeklyForecast.forecast[0].dt >
          REFRESH_TIME_MIN * 60)
    ) {
      return true;
    }

    if (
      location !== null &&
      weeklyForecast !== null &&
      location.city !== weeklyForecast.location
    ) {
      return true;
    }

    if (updateSource === "user" && searched) {
      return true;
    } else {
      return false;
    }
  };

  const shouldFetch = checkFetchConditions();

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`;
  const { data, error, isLoading } = useSWR(shouldFetch ? url : null, fetcher, {
    refreshInterval: REFRESH_TIME_MIN * 60 * 1000,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    console.log("Fetching weather forecast data");
  }

  if (data && coordinates !== null) {
    setSearched(false);

    const mappedForecast = mapForecast(data);

    if (mappedForecast !== null) {
      const weeklyForecastToStore = {
        location: location?.city,
        forecast: mappedForecast,
      };
      console.log("Stored weeklyForecast", weeklyForecastToStore);
      window.localStorage.setItem(
        "weeklyForecast",
        JSON.stringify(weeklyForecastToStore)
      );
      setWeeklyForecast(weeklyForecastToStore);
      setSelectedDailyForecast(mappedForecast[0]);
    }

    if (
      mappedForecast !== null &&
      JSON.stringify(mappedForecast) !==
        JSON.stringify(weeklyForecast?.forecast)
    ) {
      console.log("Updating forecast data");
      const weeklyForecastToStore = {
        location: location?.city,
        forecast: mappedForecast,
      };
      setWeeklyForecast(weeklyForecastToStore);
      setSelectedDailyForecast(mappedForecast[0]);
      window.localStorage.removeItem("weeklyForecast");
      window.localStorage.setItem(
        "weeklyForecast",
        JSON.stringify(weeklyForecastToStore)
      );
    }
  }

  const contextValue = useMemo(
    () => ({
      selectedDailyForecast,
      weeklyForecast: weeklyForecast?.forecast ?? [],
      selectDailyForecast,
      error,
      isLoading,
      setSearched,
    }),
    [selectedDailyForecast, weeklyForecast, error, isLoading]
  );

  return (
    <ForecastContext.Provider value={contextValue}>
      {children}
    </ForecastContext.Provider>
  );
}

export default ForecastProvider;
