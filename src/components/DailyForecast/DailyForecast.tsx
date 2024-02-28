"use client";

import { useContext, memo } from "react";
import styles from "./dailyForecast.module.scss";
import { ForecastContext } from "../../providers/ForecastProvider";
import CurrentConditionsCard from "../CurrentConditionsCard";
import DailyConditionsCard from "../DailyConditionsCard";
import TempGraphCard from "../TempGraphCard";
import HourlyForecastCard from "../HourlyForecastCard";
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
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            />
            <HourlyForecastCard
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            />
          </div>

          <div className={styles.middleRow}>
            <TempGraphCard
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            />
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

      {!selectedDailyForecast && (
        <>
          <div className={styles.topRow}>
            <CurrentConditionsCard
              title="Current Conditions"
              isPlaceHolder={true}
              dailyForecast={null}
            />
            <HourlyForecastCard isPlaceHolder={true} dailyForecast={null} />
          </div>

          <div className={styles.middleRow}>
            <TempGraphCard isPlaceHolder={true} dailyForecast={null} />
          </div>

          <div className={styles.bottomRow}>
            <DailyConditionsCard
              title="Mockday"
              isPlaceHolder={true}
              dailyForecast={null}
            ></DailyConditionsCard>
            <WindCard title="Wind" isPlaceHolder={true} dailyForecast={null} />
            <CloudCard isPlaceHolder={true} dailyForecast={null} />
          </div>
        </>
      )}
    </div>
  );
}

export default memo(DailyForecast);
