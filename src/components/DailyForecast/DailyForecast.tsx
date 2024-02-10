"use client";

import { useContext } from "react";
import styles from "./dailyForecast.module.css";
import { ForecastContext } from "../ForecastProvider";

function DailyForecast() {
  const { dailyForecast } = useContext(ForecastContext);
  return (
    <div className={styles.dailyForecastContainer}>
      <h1>{dailyForecast?.day}</h1>
    </div>
  );
}

export default DailyForecast;
