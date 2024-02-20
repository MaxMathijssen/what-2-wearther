import {
  PropsWithChildren,
  useContext,
  memo,
  useCallback,
  useState,
  useEffect,
} from "react";
import { ForecastContext } from "../../providers/ForecastProvider";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import { HOURLY_FORECAST_LENGTH } from "@/helpers/constants";
import { range } from "@/helpers/utils";
import Image from "next/legacy/image";
import styles from "./hourlyForecast.module.scss";
import classNames from "classnames";

interface HourlyForecastProps extends PropsWithChildren {
  dailyForecast: DailyForecast | null;
  isPlaceHolder: boolean;
}

function HourlyForecast({ dailyForecast, isPlaceHolder }: HourlyForecastProps) {
  const { weeklyForecast, setSelectedDailyForecast } =
    useContext(ForecastContext);
  const [visibleHourlyForecast, setVisibleHourlyForecast] = useState<
    HourlyForecast[] | null
  >(null);

  console.log(visibleHourlyForecast);

  useEffect(() => {
    if (dailyForecast !== null && dailyForecast.hourly_forecast.length > 0) {
      setVisibleHourlyForecast(getVisibleHourlyForecast(dailyForecast));
    }
  }, [dailyForecast]);

  const getVisibleHourlyForecast = useCallback(
    (dailyForecast: DailyForecast) => {
      let hourlyForecastArr: HourlyForecast[] = [
        ...dailyForecast.hourly_forecast,
      ];

      if (dailyForecast) {
        const nextDailyForecastIndex = dailyForecast.day_num + 1;
        const nextDailyForecast: DailyForecast =
          weeklyForecast[nextDailyForecastIndex];

        if (dailyForecast.day_num === 0) {
          const endIndex = HOURLY_FORECAST_LENGTH - hourlyForecastArr.length;
          for (let i = 0; i < endIndex; i++) {
            hourlyForecastArr.push(nextDailyForecast?.hourly_forecast[i]);
          }
        } else if (dailyForecast.day_num === 1) {
          hourlyForecastArr = hourlyForecastArr.slice(
            HOURLY_FORECAST_LENGTH + 1
          );
        } else if (dailyForecast.day_num === 2) {
          if (dailyForecast.hourly_forecast.length > HOURLY_FORECAST_LENGTH * 2)
            hourlyForecastArr = hourlyForecastArr.slice(
              HOURLY_FORECAST_LENGTH + 1
            );
          else if (
            dailyForecast.hourly_forecast.length > HOURLY_FORECAST_LENGTH
          ) {
            for (
              let i =
                dailyForecast.hourly_forecast.length - HOURLY_FORECAST_LENGTH;
              i > 0;
              i--
            ) {
              hourlyForecastArr.pop();
            }
          }
        }
      }
      return hourlyForecastArr;
    },
    [weeklyForecast, HOURLY_FORECAST_LENGTH]
  );

  function handleNextHours() {
    if (visibleHourlyForecast != null && dailyForecast) {
      const visibleHoursLength = visibleHourlyForecast.length;
      const dailyHoursLength = dailyForecast.hourly_forecast.length;
      console.log(
        visibleHourlyForecast[visibleHoursLength - 1].hour_num,
        dailyForecast.hourly_forecast[dailyHoursLength - 1].hour_num
      );
      if (
        visibleHourlyForecast[visibleHoursLength - 1].hour_num <
        dailyForecast.hourly_forecast[dailyHoursLength - 1].hour_num
      ) {
        console.log(weeklyForecast[dailyForecast.day_num + 1]);
        setSelectedDailyForecast(weeklyForecast[dailyForecast.day_num + 1]);
      }
    }
  }

  return (
    <>
      {isPlaceHolder && (
        <div className={styles.cardContainer}>
          <div className={classNames(styles.card, styles.placeholder)}>
            <div className={classNames(styles.cardSection, styles.header)}>
              <h1>Hourly Forecast</h1>
            </div>
            <div className={classNames(styles.cardSection, styles.body)}>
              {range(HOURLY_FORECAST_LENGTH).map((index) => {
                return (
                  <div key={index} className={styles.hourlyForecastContainer}>
                    <h2>12 PM</h2>
                    <div className={styles.imagePlaceholder}></div>
                    <h3>17°</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {dailyForecast && (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={classNames(styles.cardSection, styles.header)}>
              <h1>Hourly Forecast</h1>
            </div>
            <div
              className={classNames(styles.cardSection, styles.body, {
                [styles.centerContent]:
                  dailyForecast && dailyForecast.hourly_forecast.length === 0,
              })}
            >
              {dailyForecast && dailyForecast.hourly_forecast.length === 0 ? (
                <div
                  key={dailyForecast.day}
                  className={classNames(styles.noDataContainer, styles.fadeIn)}
                >
                  <h2>Sorry!</h2>
                  <Image
                    src="/man.webp"
                    width={100}
                    height={100}
                    alt="No hourly data"
                  />
                  <h3>
                    Hourly forecast data is only available for the next 48 hours
                  </h3>
                </div>
              ) : (
                dailyForecast.hourly_forecast.length > 0 &&
                visibleHourlyForecast?.map(
                  (hourlyForecast: HourlyForecast, index: number) => {
                    if (index < HOURLY_FORECAST_LENGTH) {
                      return (
                        <div
                          key={hourlyForecast.dt}
                          className={classNames(
                            styles.hourlyForecastContainer,
                            styles.fadeIn
                          )}
                        >
                          <h2>
                            {index === 0 && dailyForecast.day === "Today"
                              ? "Now"
                              : hourlyForecast.hour}
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
                )
              )}
              <div className={styles.btnNextHours} onClick={handleNextHours}>
                <Image
                  src="/right-arrow.png"
                  width={40}
                  height={40}
                  alt="Next hours"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(HourlyForecast);
