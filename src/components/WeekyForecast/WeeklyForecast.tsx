"use client";

import { useContext } from "react";
import { ForecastContext } from "../../app/providers/ForecastProvider";
import WeatherCard from "../WeatherCard";
import { DailyForecast } from "@/typings/types";
import { range } from "@/helpers/utils";

import styles from "./weeklyForecast.module.css";

function WeeklyForecast(): React.JSX.Element {
  const { weeklyForecast, selectDailyForecast, error } =
    useContext(ForecastContext);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      {weeklyForecast &&
        weeklyForecast.map((dailyForecast: DailyForecast) => {
          return (
            <WeatherCard
              key={dailyForecast.dt}
              isError={false}
              isPlaceHolder={false}
              dailyForecast={dailyForecast}
              selectDailyForecast={selectDailyForecast}
            />
          );
        })}
      {error &&
        range(0, 7).map((index) => {
          return (
            <WeatherCard
              key={index}
              isError={true}
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
              isPlaceHolder={true}
              dailyForecast={null}
            />
          );
        })}
    </div>
  );
}

export default WeeklyForecast;
