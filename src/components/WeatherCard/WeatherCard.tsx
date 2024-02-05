"use client";

import { useState, useEffect, useContext } from "react";
import useSWR from "swr";

import { LocationContext } from "../LocationProvider";
import { API_KEY } from "@/helpers/constants";
import { WeatherDetails, DailyForecast, WeatherAlert } from "@/typings/types";
import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  isPlaceHolder: boolean;
}

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherDetails;
  minutely?: { dt: number; precipitation: number }[]; // Optional property
  hourly?: WeatherDetails[]; // Optional property
  daily: DailyForecast[];
  alerts?: WeatherAlert[]; // Optional property
}

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function WeatherCard({ isPlaceHolder }: WeatherCardProps): React.JSX.Element {
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const location = useContext(LocationContext);

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${API_KEY}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log("render");

  return (
    <div>
      <h1>{data.current.temp}</h1>
    </div>
  );
}

export default WeatherCard;
