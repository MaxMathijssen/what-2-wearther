import styles from "./cloudCard.module.css";
import { DailyForecast } from "@/typings/types";
import classNames from "classnames";
import Image from "next/image";

interface CloudCardProps {
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast;
}

function CloudCard({
  dailyForecast,
  isPlaceHolder,
}: CloudCardProps): React.JSX.Element {
  return (
    <div className={styles.card}>
      <div className={classNames(styles.cardSection, styles.header)}>
        <h1>Cloud Cover</h1>
      </div>
      <div className={classNames(styles.cardSection, styles.body)}>
        <div className={styles.imageOverlayWrapper}>
          {/* Overlay Div */}
          <div
            className={styles.coverageOverlay}
            style={{ width: `${dailyForecast.clouds}%` }}
          ></div>
          {/* Image Component */}
          <Image
            src="/cloud.png"
            layout="fill"
            // objectFit="cover"
            alt={dailyForecast.weather}
            className={styles.cloudImage}
          />
        </div>
        <h1>{`${dailyForecast.clouds}%`}</h1>
      </div>
    </div>
  );
}

export default CloudCard;
