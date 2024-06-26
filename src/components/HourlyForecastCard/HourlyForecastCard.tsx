import { PropsWithChildren, memo } from "react";
import useVisibleHourlyForecast from "@/hooks/useVisibleHourlyForecast";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import { HOURLY_FORECAST_LENGTH } from "@/helpers/constants";
import LeftRightButton, { Direction } from "../LeftRightButton";
import { range } from "@/helpers/utils";
import HourlyForecastIndicator from "../HourlyForecastIndicator/HourlyForecastIndicator";
import Image from "next/legacy/image";
import styles from "./HourlyForecastCard.module.scss";
import classNames from "classnames";

interface HourlyForecastCardProps extends PropsWithChildren {
  dailyForecast: DailyForecast | null;
  isPlaceHolder: boolean;
}

function HourlyForecastCard({
  dailyForecast,
  isPlaceHolder,
}: HourlyForecastCardProps) {
  const { visibleHourlyForecast, handleNextHours, prevButtonVisible } =
    useVisibleHourlyForecast(dailyForecast);

  return (
    <>
      {isPlaceHolder && (
        <div className={styles.cardContainer}>
          <div className={classNames(styles.card, styles.placeholder)}>
            <div className={styles.header}>
              <h1>Hourly Forecast</h1>
            </div>
            <div className={styles.body}>
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
            <div className={styles.header}>
              <h1>Hourly Forecast</h1>
            </div>
            <div
              className={classNames(styles.body, {
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
                {prevButtonVisible && (
                  <LeftRightButton
                    onClick={() => handleNextHours(false)}
                    direction={Direction.LEFT}
                  />
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
                              {hourlyForecast.hour_index === 0 ? (
                                <strong>Now</strong>
                              ) : (
                                hourlyForecast.hour
                              )}
                            </h2>
                            <Image
                              src={hourlyForecast.iconPath}
                              width={80}
                              height={80}
                              alt={hourlyForecast.weather}
                            />
                            <h3>{`${hourlyForecast.temp}°`}</h3>
                          </div>
                        );
                      }
                    }
                  )
                )}
                {dailyForecast.day_num !== 6 && (
                  <LeftRightButton
                    onClick={() => handleNextHours(true)}
                    direction={Direction.RIGHT}
                  />
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
