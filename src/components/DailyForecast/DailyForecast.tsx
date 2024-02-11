"use client";

import { useContext } from "react";
import styles from "./dailyForecast.module.css";
import { ForecastContext } from "../../app/providers/ForecastProvider";

function DailyForecast() {
  const { selectedDailyForecast } = useContext(ForecastContext);
  return (
    <div className={styles.dailyForecastContainer}>
      <h1>{selectedDailyForecast?.day}</h1>
    </div>
  );
}

export default DailyForecast;
