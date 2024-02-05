"use client";

import { useContext } from "react";
import { TemperatureContext } from "../TemperatureProvider";
import Card from "../Card";

import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  isPlaceHolder: boolean;
}

function WeatherCard({ isPlaceHolder }: WeatherCardProps): React.JSX.Element {
  const { temperature, error, isLoading } = useContext(TemperatureContext);

  if (error) {
    return <Card>Something went wrong!</Card>;
  }

  if (isLoading) {
    return <Card>Loading..</Card>;
  }

  return <Card>{temperature}°C</Card>;
}

export default WeatherCard;
