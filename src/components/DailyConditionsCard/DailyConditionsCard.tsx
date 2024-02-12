import { PropsWithChildren } from "react";
import styles from "./dailyConditionsCard.module.css";
import { DailyForecast } from "@/typings/types";
import classNames from "classnames";
import Image from "next/image";

interface DailyConditionsCardProps extends PropsWithChildren {
  header?: string;
  title?: string;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast;
}

function DailyConditionsCard({
  title,
  dailyForecast,
  isPlaceHolder,
  children,
}: DailyConditionsCardProps): React.JSX.Element {
  return (
    <div className={styles.card}>
      <div className={classNames(styles.cardSection, styles.header)}>
        <h1>{title}</h1>
      </div>
      <div className={classNames(styles.cardSection, styles.body)}>
        <div className={styles.topRow}>
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
          <div className={styles.bottomItem}>
            <h3>UV</h3>
            <Image
              src={dailyForecast.iconPath}
              width={100}
              height={100}
              alt={dailyForecast.weather}
            />
          </div>
          <div className={styles.bottomItem}>
            <h3>Rain Chance</h3>
            <Image
              src={dailyForecast.iconPath}
              width={100}
              height={100}
              alt={dailyForecast.weather}
            />
          </div>
          <div className={styles.bottomItem}>
            <h3>Humidity</h3>
            <Image
              src={dailyForecast.iconPath}
              width={100}
              height={100}
              alt={dailyForecast.weather}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyConditionsCard;
