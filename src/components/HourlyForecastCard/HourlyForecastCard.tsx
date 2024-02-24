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
import HourlyForecastIndicator from "../HourlyForecastIndicator/HourlyForecastIndicator";
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

  console.log(visibleHourlyForecast);

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

    if (next) {
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
    }

    if (next === false) {
      for (let i = startHourIndex; endHourIndex <= i; i--) {
        if (dailyForecast.hourly_forecast[i] === undefined) {
          newDayReached = true;
          newDayHourLength = Math.abs(i - endHourIndex);
          break;
        } else if (dailyForecast.hourly_forecast[i].hour_num === 47) {
          break;
        } else {
          nextVisibleHours.unshift(dailyForecast.hourly_forecast[i]);
        }
      }
    }

    if (newDayReached) {
      if (next && nextDailyForecast.hourly_forecast[0] !== undefined) {
        for (let i = 0; i <= newDayHourLength; i++) {
          nextVisibleHours.push(nextDailyForecast.hourly_forecast[i]);
        }
      }
      if (next === false) {
        const newStartIndex = nextDailyForecast.hourly_forecast.length - 1;
        for (
          let i = newStartIndex;
          newStartIndex - newDayHourLength <= i;
          i--
        ) {
          if (nextDailyForecast.hourly_forecast[i] === undefined) {
            break;
          }
          nextVisibleHours.unshift(nextDailyForecast.hourly_forecast[i]);
        }
        selectDailyForecast(nextDailyForecast, nextVisibleHours);
      }
    }
  }

  function handleNextHours(next: boolean) {
    ignoreEffectRef.current = true;
    if (dailyForecast) {
      const nextDailyForecast: DailyForecast = retrieveNextDailyForecast(
        dailyForecast.day_num + (next ? 1 : -1)
      );
      let startHourIndex;
      const nextVisibleHours: HourlyForecast[] = [];
      if (visibleHourlyForecast !== null) {
        const lastVisibleHour = next
          ? visibleHourlyForecast[visibleHourlyForecast.length - 1]
          : visibleHourlyForecast[0];

        startHourIndex = dailyForecast.hourly_forecast.findIndex(
          (hour: HourlyForecast) =>
            hour.hour_index === lastVisibleHour.hour_index + (next ? 1 : -1)
        );

        if (dailyForecast.day_num === weeklyForecast.length - 2) {
          selectDailyForecast(nextDailyForecast, null);
          return;
        }

        if (startHourIndex === -1) {
          if (next) {
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
          }

          if (next === false) {
            fillVisibleHours(
              next,
              nextDailyForecast.hourly_forecast.length - 1,
              nextDailyForecast,
              weeklyForecast[dailyForecast.day_num - 2],
              nextVisibleHours
            );
            setVisibleHourlyForecast(nextVisibleHours);
            selectDailyForecast(nextDailyForecast, nextVisibleHours);
          }
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
      }
      if (next === false) {
        if (visibleHourlyForecast === null) {
          startHourIndex = nextDailyForecast.hourly_forecast.length - 1;
          fillVisibleHours(
            next,
            startHourIndex,
            dailyForecast,
            nextDailyForecast,
            nextVisibleHours
          );

          setVisibleHourlyForecast(nextVisibleHours.reverse());
          selectDailyForecast(nextDailyForecast, nextVisibleHours);
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
              <div className={styles.topRow}></div>
              <div className={styles.bottomRow}>
                {range(HOURLY_FORECAST_LENGTH).map((index) => (
                  <div key={index} className={styles.hourlyForecastContainer}>
                    <h2>12 PM</h2>
                    <div className={styles.imagePlaceholder}></div>
                    <h3>17°</h3>
                  </div>
                ))}
              </div>
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
              {visibleHourlyForecast !== null &&
                dailyForecast.hourly_forecast.length > 0 && (
                  <div className={classNames(styles.topRow)}>
                    <HourlyForecastIndicator
                      valueStart={visibleHourlyForecast[0].hour_index}
                      valueEnd={
                        visibleHourlyForecast[visibleHourlyForecast.length - 1]
                          .hour_index
                      }
                    />
                  </div>
                )}
              <div className={styles.bottomRow}>
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
                    className={classNames(
                      styles.noDataContainer,
                      styles.fadeIn
                    )}
                  >
                    <h2>Sorry!</h2>
                    <Image
                      src="/man.webp"
                      width={100}
                      height={100}
                      alt="No hourly data"
                    />
                    <h3>
                      Hourly forecast data is only available for the next 48
                      hours
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
                              {hourlyForecast.hour_index === 0
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
        </div>
      )}
    </>
  );
}

export default memo(HourlyForecastCard);
