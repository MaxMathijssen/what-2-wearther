import { MouseEventHandler } from "react";
import { DailyForecast } from "@/typings/types";
import Image from "next/image";

import styles from "./WeatherCard.module.css";
import classNames from "classnames";

interface WeatherCardProps {
  isError: boolean;
  isLoading: boolean;
  isFirstPlaceHolder: boolean;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
  onClick?: (dailyForecast: DailyForecast) => void;
}

function WeatherCard({
  isError,
  isFirstPlaceHolder,
  isPlaceHolder,
  dailyForecast,
  isLoading,
  onClick,
  ...delegated
}: WeatherCardProps): React.JSX.Element {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick && dailyForecast) {
      onClick(dailyForecast);
    }
  };

  const gradient = dailyForecast?.color;

  return (
    <>
      {isError && (
        <div className={styles.cardDiv}>
          <div className="top-section"></div>
          <div className="bottom-section"></div>
        </div>
      )}
      {isPlaceHolder && (
        <div className={styles.cardDiv}>
          <div className="top-section"></div>
          <div className="bottom-section"></div>
        </div>
      )}
      {dailyForecast && (
        <div className={styles.clickableCard} onClick={handleClick}>
          <div
            className={classNames(styles.cardSection, styles.topSection)}
            style={
              {
                background: gradient,
              } as React.CSSProperties
            } // Ensuring TypeScript compatibility
          >
            <div className={styles.leftColumn}>
              {dailyForecast.iconPath !== "error.png" && (
                <Image
                  src={dailyForecast.iconPath}
                  width={80}
                  height={80}
                  alt={dailyForecast.weather}
                ></Image>
              )}
            </div>
            <div className={styles.rightColumn}>
              <h1>{dailyForecast.weather}</h1>
              <h2>
                {dailyForecast.temp.current
                  ? dailyForecast.temp.current
                  : dailyForecast.temp.max}
              </h2>
            </div>
            <h3>{dailyForecast.day}</h3>
          </div>
          <div className={classNames(styles.cardSection, styles.bottomSection)}>
            <div className={styles.leftColumn}>12</div>
            <div className={styles.rightColumn}>12</div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherCard;
