"use client";

import { useContext } from "react";
import { ForecastContext } from "../ForecastProvider";
import WeatherCard from "../WeatherCard";
import { DailyForecast } from "@/typings/types";
import { range } from "@/helpers/utils";

import styles from "./cardCarousel.module.css";

function CardCarousel() {
  const { weeklyForecast, error, isLoading } = useContext(ForecastContext);

  return (
    <div className={styles.cardContainer}>
      {weeklyForecast &&
        weeklyForecast.map((dailyForecast: DailyForecast) => {
          return (
            <WeatherCard
              key={dailyForecast.dt}
              isError={false}
              isLoading={false}
              isPlaceHolder={false}
              dailyForecast={dailyForecast}
            />
          );
        })}
      {error &&
        range(0, 7).map((index) => {
          return (
            <WeatherCard
              key={index}
              isError={true}
              isLoading={false}
              isPlaceHolder={false}
              dailyForecast={null}
            />
          );
        })}
      {!weeklyForecast &&
        range(0, 7).map((index) => {
          return (
            <WeatherCard
              key={index}
              isError={false}
              isLoading={false}
              isPlaceHolder={true}
              dailyForecast={null}
            />
          );
        })}
    </div>
  );
}

export default CardCarousel;
