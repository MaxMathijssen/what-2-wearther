import { useState, useCallback, useRef, useContext, useEffect } from "react";
import { HOURLY_FORECAST_LENGTH } from "@/helpers/constants";
import { ForecastContext } from "../providers/ForecastProvider";
import { DailyForecast, HourlyForecast } from "@/typings/types";

function useVisibleHourlyForecast(dailyForecast: DailyForecast | null) {
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
        } else if (dailyForecast.day_num === 1) {
          fillVisibleHours(
            true,
            9,
            dailyForecast,
            nextDailyForecast,
            hourlyForecastArr
          );
          return hourlyForecastArr;
        } else if (dailyForecast.day_num === 2) {
          if (
            dailyForecast.hourly_forecast.length >
            HOURLY_FORECAST_LENGTH * 2
          ) {
            fillVisibleHours(
              true,
              9,
              dailyForecast,
              nextDailyForecast,
              hourlyForecastArr
            );
            return hourlyForecastArr;
          } else if (
            dailyForecast.hourly_forecast.length < HOURLY_FORECAST_LENGTH
          ) {
            fillVisibleHours(
              true,
              0,
              dailyForecast,
              nextDailyForecast,
              hourlyForecastArr
            );
            return hourlyForecastArr;
          } else if (
            dailyForecast.hourly_forecast.length > HOURLY_FORECAST_LENGTH
          ) {
            fillVisibleHours(
              false,
              dailyForecast.hourly_forecast.length - 1,
              dailyForecast,
              nextDailyForecast,
              hourlyForecastArr
            );
            return hourlyForecastArr;
          }
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
        if (nextDailyForecast === undefined) {
          return;
        }
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
              setVisibleHourlyForecast(null);
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

          setVisibleHourlyForecast(nextVisibleHours);
          selectDailyForecast(nextDailyForecast, nextVisibleHours);
        }
      } else if (dailyForecast.hourly_forecast.length === 0) {
        selectDailyForecast(nextDailyForecast, null);
      }
    }
  }

  const prevButtonVisible =
    visibleHourlyForecast === null ||
    (dailyForecast !== null && visibleHourlyForecast[0]?.hour_index !== 0);

  return { visibleHourlyForecast, handleNextHours, prevButtonVisible };
}

export default useVisibleHourlyForecast;
