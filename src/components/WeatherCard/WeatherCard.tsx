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
    <Card
      header={dailyForecast?.day}
      title={
        dailyForecast?.temp.current
          ? `${Math.round(dailyForecast.temp.current)} °C`
          : undefined
      }
      subTitle={dailyForecast?.weather}
    >
      {dailyForecast?.temp
        ? `H:${Math.round(dailyForecast.temp.max)}°C L:${Math.round(
            dailyForecast.temp.min
          )}°C`
        : undefined}
    </Card>
  );
}

export default WeatherCard;
