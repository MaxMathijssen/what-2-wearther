import { memo } from "react";
import styles from "./CloudCard.module.scss";
import { DailyForecast } from "@/typings/types";
import classNames from "classnames";
import Image from "next/legacy/image";

interface CloudCardProps {
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
}

function CloudCard({
  dailyForecast,
  isPlaceHolder,
}: CloudCardProps): React.JSX.Element {
  return (
    <>
      {isPlaceHolder && (
        <div className={classNames(styles.card, styles.placeholder)}>
          <div className={styles.header}>
            <h1>Cloud Cover</h1>
          </div>
          <div className={styles.body}>
            <div className={styles.imagePlaceholder}></div>
            <h1>50%</h1>
          </div>
        </div>
      )}
      {dailyForecast && (
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Cloud Cover</h1>
          </div>
          <div className={styles.body}>
            <div
              key={dailyForecast.day}
              className={classNames(styles.bodyContent, styles.fadeIn)}
            >
              <div className={styles.imageOverlayWrapper}>
                <div
                  className={styles.coverageOverlay}
                  style={{ width: `${dailyForecast.clouds}%` }}
                ></div>
                <Image
                  priority={true}
                  src="/cloud.webp"
                  layout="fill"
                  objectFit="cover"
                  alt={dailyForecast.weather}
                  className={styles.cloudImage}
                />
              </div>
              <h1>{`${dailyForecast.clouds}%`}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(CloudCard);
