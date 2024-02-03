"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

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

type Location = {
  longitude: number;
  latitude: number;
};

function WeatherCard({ isPlaceHolder }: WeatherCardProps): React.JSX.Element {
  const [location, setLocation] = useState<Location>();
  const [temperature, setTemperature] = useState<number | undefined>(undefined);

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${API_KEY}`;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position: {
        coords: Location;
      }) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.current.temp}</h1>
    </div>
  );
}

export default WeatherCard;
