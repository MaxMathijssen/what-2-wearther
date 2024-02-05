"use client";

import { useContext } from "react";
import { TemperatureContext } from "../TemperatureProvider";

import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  isPlaceHolder: boolean;
}

function WeatherCard({ isPlaceHolder }: WeatherCardProps): React.JSX.Element {
  const { temperature, error, isLoading } = useContext(TemperatureContext);

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div>
      <h1>{temperature}°C</h1>
    </div>
  );
}

export default WeatherCard;
