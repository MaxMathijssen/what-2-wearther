"use client";

import { useContext } from "react";
import styles from "./dailyForecast.module.css";
import { ForecastContext } from "../../app/providers/ForecastProvider";
import CurrentConditionsCard from "../CurrentConditionsCard";
import DailyConditionsCard from "../DailyConditionsCard";
import HourlyForecast from "../HourlyForecast";
import WindCard from "../WindCard";
import CloudCard from "../CloudCard";

function DailyForecast(): React.JSX.Element {
  const { selectedDailyForecast } = useContext(ForecastContext);
  return (
    <div className={styles.dailyForecastContainer}>
      {selectedDailyForecast && (
        <>
          <div className={styles.topRow}>
            <CurrentConditionsCard
              title="Current Conditions"
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            />
            <HourlyForecast dailyForecast={selectedDailyForecast} />
          </div>

          <div className={styles.bottomRow}>
            <DailyConditionsCard
              title={selectedDailyForecast.day}
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            ></DailyConditionsCard>
            <WindCard
              title="Wind"
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            />
            <CloudCard
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DailyForecast;
