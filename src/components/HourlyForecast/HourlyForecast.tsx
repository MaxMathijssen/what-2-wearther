import { PropsWithChildren, useContext } from "react";
import { convertTimestampToHour } from "@/helpers/utils";
import { ForecastContext } from "../../app/providers/ForecastProvider";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import { HOURLY_FORECAST_LENGTH } from "@/helpers/constants";
import Image from "next/image";
import styles from "./hourlyForecast.module.css";
import classNames from "classnames";

interface HourlyForecastProps extends PropsWithChildren {
  dailyForecast: DailyForecast;
}

function HourlyForecast({ dailyForecast }: HourlyForecastProps) {
  const { weeklyForecast } = useContext(ForecastContext);
  const nextDailyForecast: DailyForecast =
    weeklyForecast[dailyForecast.day_num + 1];
  let hourlyForecastArr: HourlyForecast[] = dailyForecast.hourly_forecast;

  if (dailyForecast.day_num === 0) {
    const endIndex = HOURLY_FORECAST_LENGTH - hourlyForecastArr.length;
    for (let i = 0; i < endIndex; i++) {
      hourlyForecastArr.push(nextDailyForecast.hourly_forecast[i]);
    }
  } else if (dailyForecast.day_num === 1) {
    hourlyForecastArr = hourlyForecastArr.slice(HOURLY_FORECAST_LENGTH);
  } else if (dailyForecast.day_num === 2) {
    if (dailyForecast.hourly_forecast.length > HOURLY_FORECAST_LENGTH * 2)
      hourlyForecastArr = hourlyForecastArr.slice(HOURLY_FORECAST_LENGTH);
    else if (dailyForecast.hourly_forecast.length > HOURLY_FORECAST_LENGTH) {
      for (
        let i = dailyForecast.hourly_forecast.length;
        i < HOURLY_FORECAST_LENGTH;
        i--
      ) {
        hourlyForecastArr.pop();
      }
    }
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={classNames(styles.cardSection, styles.header)}>
          <h1>Hourly Forecast</h1>
        </div>
        <div className={classNames(styles.cardSection, styles.body)}>
          {dailyForecast.hourly_forecast.length > 0 &&
            hourlyForecastArr.map(
              (hourlyForecast: HourlyForecast, index: number) => {
                if (index < 9) {
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