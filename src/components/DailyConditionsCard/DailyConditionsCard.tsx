import styles from "./dailyConditionsCard.module.css";
import { DailyForecast } from "@/typings/types";
import { ANIMATION_DURATION_MS } from "@/helpers/constants";
import classNames from "classnames";
import Image from "next/legacy/image";
import GradualCircularProgress from "../GradualCircularProgress";

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
          <div className={classNames(styles.cardSection, styles.header)}>
            <h1>{title}</h1>
          </div>
          <div className={classNames(styles.cardSection, styles.body)}>
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
          <div className={classNames(styles.cardSection, styles.header)}>
            <h1>{title}</h1>
          </div>
          <div className={classNames(styles.cardSection, styles.body)}>
            <div
              key={dailyForecast.day}
              className={classNames(styles.topRow, styles.fadeIn)}
            >
              <div className={styles.topItem}>
                <h3>Sunrise</h3>
                <Image
                  src="/sunrise.png"
                  width={32}
                  height={32}
                  alt={dailyForecast.weather}
                />
                <h2>{dailyForecast.sunrise}</h2>
              </div>
              <div className={styles.topItem}>
                <h3>Sunset</h3>
                <Image
                  src="/sunset.png"
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
                <GradualCircularProgress
                  targetValue={dailyForecast.uvi * 10}
                  duration={ANIMATION_DURATION_MS}
                  {...{ color: "danger" }}
                >
                  {`${dailyForecast.uvi}/10`}
                </GradualCircularProgress>
              </div>
              <div
                key={dailyForecast.dt}
                className={classNames(styles.bottomItem, styles.fadeIn)}
              >
                <h3>Rain Chance</h3>
                <GradualCircularProgress
                  targetValue={dailyForecast.pop}
                  duration={ANIMATION_DURATION_MS}
                >
                  {`${dailyForecast.pop}%`}
                </GradualCircularProgress>
              </div>
              <div
                key={dailyForecast.day_num}
                className={classNames(styles.bottomItem, styles.fadeIn)}
              >
                <h3>Humidity</h3>
                <GradualCircularProgress
                  targetValue={dailyForecast.humidity}
                  duration={ANIMATION_DURATION_MS}
                  {...{ color: "neutral" }}
                >
                  {`${dailyForecast.humidity}%`}
                </GradualCircularProgress>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DailyConditionsCard;
