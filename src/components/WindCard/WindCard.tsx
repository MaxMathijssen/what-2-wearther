import styles from "./windCard.module.css";
import classNames from "classnames";
import Image from "next/legacy/image";
import { DailyForecast } from "@/typings/types";

interface WindCardProps {
  title?: string;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast;
}

function WindCard({
  title,
  dailyForecast,
  isPlaceHolder,
}: WindCardProps): React.JSX.Element {
  return (
    <div className={styles.card}>
      <div className={classNames(styles.cardSection, styles.header)}>
        <h1>{title}</h1>
      </div>
      <div className={classNames(styles.cardSection, styles.body)}>
        <div className={styles.leftColumn}>
          <Image
            src="/wind_speed.png"
            width={20}
            height={20}
            alt={dailyForecast.weather}
          />
          <Image
            src="/wind_gust.png"
            width={20}
            height={20}
            alt={dailyForecast.weather}
          />
          <Image
            src="/wind_direction.png"
            width={20}
            height={20}
            alt={dailyForecast.weather}
          />
        </div>
        <div className={styles.middleColumn}>
          <h2>Speed</h2>
          <h2>Gust</h2>
          <h2>Direction</h2>
        </div>
        <div className={styles.rightColumn}>
          <h3>{`${dailyForecast.wind_speed} km/h`}</h3>
          <h3>{`${dailyForecast.wind_gust} km/h`}</h3>
          <h3>{dailyForecast.wind_direction}</h3>
        </div>
      </div>
    </div>
  );
}

export default WindCard;
