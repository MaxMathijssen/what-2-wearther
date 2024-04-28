import React from "react";
import WeeklyForecast from "../WeeklyForecast";
import DailyForecast from "../DailyForecast";
import styles from "./Forecast.module.scss";

function Forecast() {
  return (
    <main className={styles.main}>
      <WeeklyForecast />
      <DailyForecast />
    </main>
  );
}

export default Forecast;
