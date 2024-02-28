import styles from "./dailyConditionsCard.module.scss";
import { memo } from "react";
import { DailyForecast } from "@/typings/types";
import classNames from "classnames";
import Image from "next/legacy/image";
import CircularProgress from "@mui/joy/CircularProgress";

interface DailyConditionsCardProps {
  title?: string;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
}

function DailyConditionsCard({
  title,
  dailyForecast,
  isPlaceHolder,
}: DailyConditionsCardProps): React.JSX.Element {
  return (
    <>
      {isPlaceHolder && (
        <div className={classNames(styles.card, styles.placeholder)}>
          <div className={styles.header}>
            <h1>{title}</h1>
          </div>
          <div className={styles.body}>
            <div className={styles.topRow}>
              <div className={styles.topItem}>
                <h3>Sunrise</h3>
                <div className={styles.imagePlaceholder}></div>
                <h2>12:00</h2>
              </div>
              <div className={styles.topItem}>
                <h3>Sunset</h3>
                <div className={styles.imagePlaceholder}></div>
                <h2>15:00</h2>
              </div>
            </div>
            <div className={styles.bottomRow}>
              <div className={styles.bottomItem}>
                <h3>UV Index</h3>
                <div className={styles.spinnerPlaceholder}></div>
              </div>
              <div className={styles.bottomItem}>
                <h3>Rain Chance</h3>
                <div className={styles.spinnerPlaceholder}></div>
              </div>
              <div className={styles.bottomItem}>
                <h3>Humidity</h3>
                <div className={styles.spinnerPlaceholder}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {dailyForecast && (
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>{title}</h1>
          </div>
          <div className={styles.body}>
            <div
              key={dailyForecast.day}
              className={classNames(styles.topRow, styles.fadeIn)}
            >
              <div className={styles.topItem}>
                <h3>Sunrise</h3>
                <Image
                  src="/sunrise.webp"
                  width={32}
                  height={32}
                  alt={dailyForecast.weather}
                />
                <h2>{dailyForecast.sunrise}</h2>
              </div>
              <div className={styles.topItem}>
                <h3>Sunset</h3>
                <Image
                  src="/sunset.webp"
                  width={32}
                  height={32}
                  alt={dailyForecast.weather}
                />
                <h2>{dailyForecast.sunset}</h2>
              </div>
            </div>
            <div className={styles.bottomRow}>
              <div
                key={dailyForecast.day}
                className={classNames(styles.bottomItem, styles.fadeIn)}
              >
                <h3>UV Index</h3>
                <CircularProgress
                  color="danger"
                  size="lg"
                  determinate
                  value={dailyForecast.uvi * 10}
                >
                  {`${dailyForecast.uvi}/10`}
                </CircularProgress>
              </div>
              <div
                key={dailyForecast.dt}
                className={classNames(styles.bottomItem, styles.fadeIn)}
              >
                <h3>Rain Chance</h3>
                <CircularProgress
                  size="lg"
                  determinate
                  value={dailyForecast.pop}
                >
                  {`${dailyForecast.pop}%`}
                </CircularProgress>
              </div>
              <div
                key={dailyForecast.day_num}
                className={classNames(styles.bottomItem, styles.fadeIn)}
              >
                <h3>Humidity</h3>
                <CircularProgress
                  color="neutral"
                  size="lg"
                  determinate
                  value={dailyForecast.humidity}
                >
                  {`${dailyForecast.humidity}%`}
                </CircularProgress>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(DailyConditionsCard);
