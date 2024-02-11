import { PropsWithChildren } from "react";
import { convertTimestampToHour } from "@/helpers/utils";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import Image from "next/image";
import styles from "./hourlyForecast.module.css";
import classNames from "classnames";

interface HourlyForecastProps extends PropsWithChildren {
  dailyForecast: DailyForecast;
}

function HourlyForecast({ dailyForecast }: HourlyForecastProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={classNames(styles.cardSection, styles.topSection)}>
          <h1>Hourly Forecast</h1>
        </div>
        <div className={classNames(styles.cardSection, styles.bottomSection)}>
          {dailyForecast.hourly_forecast.map(
            (hourlyForecast: HourlyForecast, index: number) => {
              if (index < 8) {
                return (
                  <div
                    key={hourlyForecast.dt}
                    className={styles.hourlyForecastContainer}
                  >
                    <h2>
                      {index === 0 && dailyForecast.day === "Today"
                        ? "Now"
                        : convertTimestampToHour(hourlyForecast.dt)}
                    </h2>
                    <Image
                      src={hourlyForecast.iconPath}
                      width={80}
                      height={80}
                      alt={hourlyForecast.weather}
                    />
                    <h3>{`${Math.round(hourlyForecast.temp)}°`}</h3>
                  </div>
                );
              }
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;
