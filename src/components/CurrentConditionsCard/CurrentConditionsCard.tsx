import { memo } from "react";
import styles from "./CurrentConditionsCard.module.scss";
import classNames from "classnames";
import Image from "next/legacy/image";
import { DailyForecast } from "@/typings/types";

interface CurrentConditionsCardProps {
  title?: string;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
}

function CurrentConditionsCard({
  dailyForecast,
  isPlaceHolder,
}: CurrentConditionsCardProps): React.JSX.Element {
  return (
    <>
      {isPlaceHolder && (
        <div className={classNames(styles.card, styles.placeholder)}>
          <div className={styles.header}>
            <h1>Current Conditions</h1>
          </div>
          <div className={styles.body}>
            <div className={styles.imagePlaceholder}></div>
            <h1>Rain</h1>
            <h2>15°`</h2>
            <h3>Feels like 15°</h3>
          </div>
        </div>
      )}

      {dailyForecast && (
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>
              {dailyForecast?.day === "Today"
                ? "Current Conditions"
                : "Overall Conditions"}
            </h1>
          </div>
          <div className={styles.body}>
            <Image
              key={dailyForecast.day}
              className={styles.fadeIn}
              src={dailyForecast.iconPath}
              width={100}
              height={100}
              alt={dailyForecast.weather}
            />
            <h1 key={dailyForecast.dt} className={styles.fadeIn}>
              {dailyForecast.weather}
            </h1>
            <h2 key={dailyForecast.day_num} className={styles.fadeIn}>
              {dailyForecast.temp.current
                ? `${dailyForecast.temp.current}°`
                : `${dailyForecast.temp.max}°`}
            </h2>
            <h3
              key={dailyForecast.wind_gust}
              className={styles.fadeIn}
            >{`Feels like ${
              dailyForecast.feels_like.current
                ? dailyForecast.feels_like.current
                : dailyForecast.feels_like.day
            }°`}</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(CurrentConditionsCard);
