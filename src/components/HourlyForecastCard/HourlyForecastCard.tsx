import {
  PropsWithChildren,
  useContext,
  memo,
  useCallback,
  useState,
  useEffect,
  useRef,
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
  const { weeklyForecast, selectDailyForecast } = useContext(ForecastContext);
  const [visibleHourlyForecast, setVisibleHourlyForecast] = useState<
    HourlyForecast[] | null
  >(null);
  const ignoreEffectRef = useRef(false);

  function retrieveNextDailyForecast(dailyForecastNum: number) {
    return weeklyForecast[dailyForecastNum];
  }

  const getVisibleHourlyForecast = useCallback(
    (dailyForecast: DailyForecast) => {
      let hourlyForecastArr: HourlyForecast[] = [];

      if (dailyForecast) {
        const nextDailyForecastIndex = dailyForecast.day_num + 1;
        const nextDailyForecast: DailyForecast =
          weeklyForecast[nextDailyForecastIndex];

        if (dailyForecast.day_num === 0) {
          fillVisibleHours(
            true,
            0,
            dailyForecast,
            nextDailyForecast,
            hourlyForecastArr
          );
          return hourlyForecastArr;
        } else if (dailyForecast.day_num === 1 || 2) {
          fillVisibleHours(
            true,
            9,
            dailyForecast,
            nextDailyForecast,
            hourlyForecastArr
          );
          return hourlyForecastArr;
        } else return null;
      }
      return null;
    },
    [weeklyForecast, HOURLY_FORECAST_LENGTH]
  );

  useEffect(() => {
    if (ignoreEffectRef.current) {
      ignoreEffectRef.current = false;
      return;
    }

    if (dailyForecast !== null) {
      if (dailyForecast.day_num >= 3) {
        setVisibleHourlyForecast(null);
      } else if (dailyForecast.hourly_forecast.length > 0) {
        setVisibleHourlyForecast(getVisibleHourlyForecast(dailyForecast));
      }
    }
  }, [dailyForecast, getVisibleHourlyForecast]);

  function fillVisibleHours(
    next: boolean,
    startHourIndex: number,
    dailyForecast: DailyForecast,
    nextDailyForecast: DailyForecast,
    nextVisibleHours: HourlyForecast[]
  ) {
    const endHourIndex = next
      ? startHourIndex + HOURLY_FORECAST_LENGTH - 1
      : startHourIndex - HOURLY_FORECAST_LENGTH + 1;
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

  function handleNextHours(next: boolean) {
    ignoreEffectRef.current = true;
    if (dailyForecast) {
      const nextDailyForecast: DailyForecast = retrieveNextDailyForecast(
        dailyForecast.day_num + (next ? 1 : -1)
      );
      if (visibleHourlyForecast !== null) {
        const lastVisibleHour = next
          ? visibleHourlyForecast[visibleHourlyForecast.length - 1]
          : visibleHourlyForecast[0];
        const nextVisibleHours: HourlyForecast[] = [];

        let startHourIndex = dailyForecast.hourly_forecast.findIndex(
          (hour: HourlyForecast) =>
            hour.hour_index === lastVisibleHour.hour_index + (next ? 1 : -1)
        );

        if (dailyForecast.day_num === weeklyForecast.length - 2) {
          selectDailyForecast(nextDailyForecast, null);
          return;
        }

        if (startHourIndex === -1) {
          startHourIndex = nextDailyForecast.hourly_forecast.findIndex(
            (hour: HourlyForecast) =>
              hour.hour_index === lastVisibleHour.hour_index + 1
          );
          fillVisibleHours(
            next,
            startHourIndex,
            nextDailyForecast,
            weeklyForecast[
              next ? dailyForecast.day_num + 2 : dailyForecast.day_num - 2
            ],
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
            next,
            startHourIndex,
            dailyForecast,
            nextDailyForecast,
            nextVisibleHours
          );
          setVisibleHourlyForecast(nextVisibleHours);
        }
      } else if (dailyForecast.hourly_forecast.length === 0) {
        selectDailyForecast(nextDailyForecast, null);
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
              {dailyForecast.day_num !== 0 && (
                <div
                  className={styles.btnPrevHours}
                  onClick={() => handleNextHours(false)}
                >
                  <Image
                    src="/left-arrow.png"
                    width={40}
                    height={40}
                    alt="Next hours"
                  />
                </div>
              )}
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
                <div
                  className={styles.btnNextHours}
                  onClick={() => handleNextHours(true)}
                >
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
