import React, { useState, useEffect } from "react";
import styles from "./cloudCard.module.css";
import { ANIMATION_DURATION_MS } from "@/helpers/constants";
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
  const [overlayWidth, setOverlayWidth] = useState(0);

  useEffect(() => {
    const targetWidth = dailyForecast.clouds;
    const animationDuration = ANIMATION_DURATION_MS;
    const incrementPerFrame = targetWidth / (animationDuration / 16.6667);

    function animateFill() {
      setOverlayWidth((prevWidth) => {
        const newWidth = prevWidth + incrementPerFrame;
        if (newWidth >= targetWidth) {
          return targetWidth;
        }
        return newWidth;
      });
    }

    const intervalId = setInterval(animateFill, 16.6667);

    return () => clearInterval(intervalId);
  }, [dailyForecast.clouds]);

  return (
    <div className={styles.card}>
      <div className={classNames(styles.cardSection, styles.header)}>
        <h1>Cloud Cover</h1>
      </div>
      <div className={classNames(styles.cardSection, styles.body)}>
        <div className={styles.imageOverlayWrapper}>
          <div
            className={styles.coverageOverlay}
            style={{ width: `${overlayWidth}%` }}
          ></div>
          <Image
            src="/cloud.png"
            layout="fill"
            objectFit="cover"
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
