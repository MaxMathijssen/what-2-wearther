"use client";

import { useContext, useId } from "react";
import { ForecastContext } from "../../app/providers/ForecastProvider";
import WeatherCard from "../WeatherCard";
import { DailyForecast } from "@/typings/types";
import { range } from "@/helpers/utils";
import { motion } from "framer-motion";

import styles from "./weeklyForecast.module.css";

function WeeklyForecast(): React.JSX.Element {
  const { weeklyForecast, selectedDailyForecast, selectDailyForecast, error } =
    useContext(ForecastContext);

  const id = useId();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      {weeklyForecast &&
        weeklyForecast.map((dailyForecast: DailyForecast) => (
          <div key={dailyForecast.dt} className={styles.weatherCardContainer}>
            {dailyForecast === selectedDailyForecast && (
              <motion.div layoutId={id} className={styles.selectedBorder} />
            )}
            <WeatherCard
              isError={false}
              isPlaceHolder={false}
              dailyForecast={dailyForecast}
              selectDailyForecast={() => selectDailyForecast(dailyForecast)}
            />
          </div>
        ))}

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
