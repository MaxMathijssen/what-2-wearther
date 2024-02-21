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
import styles from "./hourlyForecastCard.module.scss";
import classNames from "classnames";

interface HourlyForecastCardProps extends PropsWithChildren {
  dailyForecast: DailyForecast | null;
  isPlaceHolder: boolean;
}

function HourlyForecastCard({
  dailyForecast,
  isPlaceHolder,
}: HourlyForecastCardProps) {
  const { weeklyForecast, selectDailyForecast, initialVisibleHours } =
    useContext(ForecastContext);
  const [visibleHourlyForecast, setVisibleHourlyForecast] = useState<
    HourlyForecast[] | null
  >(null);

  useEffect(() => {
    if (dailyForecast !== null && dailyForecast.hourly_forecast.length > 0) {
      if (initialVisibleHours !== null) {
        setVisibleHourlyForecast(initialVisibleHours);
      } else {
        setVisibleHourlyForecast(getVisibleHourlyForecast(dailyForecast));
      }
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
          return hourlyForecastArr;
        }
        if (dailyForecast.day_num === 1) {
          return hourlyForecastArr.slice(
            HOURLY_FORECAST_LENGTH + 1,
            HOURLY_FORECAST_LENGTH * 2 + 1
          );
        }
        if (dailyForecast.day_num === 2) {
          if (
            dailyForecast.hourly_forecast.length >
            HOURLY_FORECAST_LENGTH * 2 + 1
          )
            return hourlyForecastArr.slice(
              HOURLY_FORECAST_LENGTH + 1,
              HOURLY_FORECAST_LENGTH * 2 + 1
            );
          if (dailyForecast.hourly_forecast.length > HOURLY_FORECAST_LENGTH) {
            for (
              let i =
                dailyForecast.hourly_forecast.length - HOURLY_FORECAST_LENGTH;
              i > 0;
              i--
            ) {
              hourlyForecastArr.pop();
            }
            return hourlyForecastArr;
          }
          return hourlyForecastArr;
        }
      }
      return null;
    },
    [weeklyForecast, HOURLY_FORECAST_LENGTH]
  );

  function handleNextHours() {
    if (visibleHourlyForecast != null && dailyForecast) {
      const lastVisibleHour =
        visibleHourlyForecast[visibleHourlyForecast.length - 1];
      const nextVisibleHours: HourlyForecast[] = [];
      const nextDailyForecast: DailyForecast = retrieveNextDailyForecast(
        dailyForecast.day_num + 1
      );

      if (dailyForecast.day_num === 5) {
        selectDailyForecast(nextDailyForecast, null);
        return;
      }

      let startHourIndex = dailyForecast.hourly_forecast.findIndex(
        (hour: HourlyForecast) =>
          hour.hour_index === lastVisibleHour.hour_index + 1
      );

      if (startHourIndex === -1) {
        startHourIndex = nextDailyForecast.hourly_forecast.findIndex(
          (hour: HourlyForecast) =>
            hour.hour_index === lastVisibleHour.hour_index + 1
        );
        fillVisibleHours(
          startHourIndex,
          nextDailyForecast,
          weeklyForecast[dailyForecast.day_num + 2],
          nextVisibleHours
        );
        if (nextVisibleHours.length === 0) {
          selectDailyForecast(nextDailyForecast, null);
          return;
        }
        if (nextVisibleHours.length === 8) {
          selectDailyForecast(nextDailyForecast, nextVisibleHours);
        }
        setVisibleHourlyForecast(nextVisibleHours);
      } else {
        fillVisibleHours(
          startHourIndex,
          dailyForecast,
          nextDailyForecast,
          nextVisibleHours
        );
        setVisibleHourlyForecast(nextVisibleHours);
      }
    }
  }

  function retrieveNextDailyForecast(dailyForecastNum: number) {
    return weeklyForecast[dailyForecastNum];
  }

  function fillVisibleHours(
    startHourIndex: number,
    dailyForecast: DailyForecast,
    nextDailyForecast: DailyForecast,
    nextVisibleHours: HourlyForecast[]
  ) {
    const endHourIndex = startHourIndex + HOURLY_FORECAST_LENGTH - 1;
    let newDayReached = false;
    let newDayHourLength = 0;

    for (let i = startHourIndex; i <= endHourIndex; i++) {
      if (dailyForecast.hourly_forecast[i] === undefined) {
        newDayReached = true;
        newDayHourLength = endHourIndex - i;
        break;
      } else if (dailyForecast.hourly_forecast[i].hour_num === 47) {
        break;
      } else {
        nextVisibleHours.push(dailyForecast.hourly_forecast[i]);
      }
    }

    if (newDayReached && nextDailyForecast.hourly_forecast[0] !== undefined) {
      for (let i = 0; i <= newDayHourLength; i++) {
        nextVisibleHours.push(nextDailyForecast.hourly_forecast[i]);
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
              {dailyForecast.day_num !== 6 && (
                <div className={styles.btnNextHours} onClick={handleNextHours}>
                  <Image
                    src="/right-arrow.png"
                    width={40}
                    height={40}
                    alt="Next hours"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(HourlyForecastCard);
