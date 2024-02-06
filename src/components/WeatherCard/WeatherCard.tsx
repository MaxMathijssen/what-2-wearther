"use client";

import Card from "../Card";
import { DailyForecast } from "@/typings/types";

import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  isError: boolean;
  isLoading: boolean;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
}

function WeatherCard({
  isError,
  isLoading,
  isPlaceHolder,
  dailyForecast,
}: WeatherCardProps): React.JSX.Element {
  if (isError) {
    return <Card>Something went wrong!</Card>;
  }

  if (isLoading) {
    return <Card>Loading..</Card>;
  }

  return (
    <Card>
      {dailyForecast?.temp.current
        ? dailyForecast.temp.current
        : dailyForecast?.temp.max}
      °C
    </Card>
  );
}

export default WeatherCard;
