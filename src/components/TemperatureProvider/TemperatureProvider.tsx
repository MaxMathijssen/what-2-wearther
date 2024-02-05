"use client";

import { useContext, createContext, PropsWithChildren } from "react";
import { API_KEY } from "@/helpers/constants";
import { LocationContext } from "../LocationProvider";
import useSWR from "swr";

export const TemperatureContext = createContext<number | any | boolean | null>(
  null
);

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function TemperatureProvider({ children }: PropsWithChildren) {
  const location = useContext(LocationContext);
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${API_KEY}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 900000,
    revalidateOnFocus: false,
  });

  console.log("Fetched temp");
  const temperature = Math.round(data?.current.temp);

  return (
    <TemperatureContext.Provider value={{ temperature, error, isLoading }}>
      {children}
    </TemperatureContext.Provider>
  );
}

export default TemperatureProvider;
