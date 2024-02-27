"use client";

import { useContext, useId, memo } from "react";
import { ForecastContext } from "../../providers/ForecastProvider";
import WeatherCard from "../WeatherCard";
import { DailyForecast } from "@/typings/types";
import { range } from "@/helpers/utils";
import { motion } from "framer-motion";

import styles from "./weeklyForecast.module.scss";

function WeeklyForecast(): React.JSX.Element {
  const { weeklyForecast, selectedDailyForecast, selectDailyForecast, error } =
    useContext(ForecastContext);

  const id = useId();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      {weeklyForecast &&
        weeklyForecast.map((dailyForecast: DailyForecast) => {
          const isSelected = dailyForecast.dt === selectedDailyForecast?.dt;
          return (
            <div key={dailyForecast.dt} className={styles.weatherCardContainer}>
              {dailyForecast === selectedDailyForecast && (
                <motion.div layoutId={id} className={styles.selectedBorder} />
              )}
              <WeatherCard
                isSelected={isSelected}
                isError={false}
                isPlaceHolder={false}
                dailyForecast={dailyForecast}
                selectDailyForecast={() =>
                  selectDailyForecast(dailyForecast, null)
                }
              />
            </div>
          );
        })}

      {error &&
        range(0, 7).map((index) => {
          return (
            <WeatherCard
              isSelected={false}
              key={index}
              isError={true}
              isPlaceHolder={false}
              dailyForecast={null}
            />
          );
        })}
      {!weeklyForecast ||
        (weeklyForecast.length === 0 &&
          range(0, 7).map((index) => (
            <div key={index} className={styles.weatherCardContainer}>
              <WeatherCard
                isSelected={false}
                key={index}
                isError={false}
                isPlaceHolder={true}
                dailyForecast={null}
              />
            </div>
          )))}
    </div>
  );
}

export default memo(WeeklyForecast);
