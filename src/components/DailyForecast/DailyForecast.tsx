"use client";

import { useContext } from "react";
import styles from "./dailyForecast.module.css";
import { ForecastContext } from "../../app/providers/ForecastProvider";
import CurrentConditionsCard from "../CurrentConditionsCard";
import DailyConditionsCard from "../DailyConditionsCard";
import HourlyForecast from "../HourlyForecast";
import Image from "next/image";

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
            >
              <Image
                src={selectedDailyForecast.iconPath}
                width={100}
                height={100}
                alt={selectedDailyForecast.weather}
              />
              <h1>{selectedDailyForecast.weather}</h1>
              <h2>
                {selectedDailyForecast.temp.current
                  ? `${selectedDailyForecast.temp.current}°`
                  : `${selectedDailyForecast.temp.max}°`}
              </h2>
              <h3>{`Feels like ${
                selectedDailyForecast.feels_like.current
                  ? selectedDailyForecast.feels_like.current
                  : selectedDailyForecast.feels_like.day
              }°`}</h3>
            </CurrentConditionsCard>
            <HourlyForecast dailyForecast={selectedDailyForecast} />
          </div>

          <div className={styles.bottomRow}>
            <DailyConditionsCard
              title={selectedDailyForecast.day}
              isPlaceHolder={false}
              dailyForecast={selectedDailyForecast}
            ></DailyConditionsCard>
          </div>
        </>
      )}
    </div>
  );
}

export default DailyForecast;
