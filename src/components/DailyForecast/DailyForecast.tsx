"use client";

import { useContext } from "react";
import styles from "./dailyForecast.module.css";
import { ForecastContext } from "../../app/providers/ForecastProvider";
import Card from "../Card";
import Image from "next/image";

function DailyForecast(): React.JSX.Element {
  const { selectedDailyForecast } = useContext(ForecastContext);
  return (
    <div className={styles.dailyForecastContainer}>
      {selectedDailyForecast && (
        <>
          <Card title="Current Conditions" isPlaceHolder={false}>
            <Image
              src={selectedDailyForecast.iconPath}
              width={100}
              height={100}
              alt={selectedDailyForecast.weather}
            ></Image>
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
          </Card>
        </>
      )}
    </div>
  );
}

export default DailyForecast;
