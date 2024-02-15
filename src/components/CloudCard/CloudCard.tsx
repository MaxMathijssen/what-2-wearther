import React, { useState, useEffect } from "react";
import styles from "./cloudCard.module.css";
import { ANIMATION_DURATION_MS } from "@/helpers/constants";
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
  const [overlayWidth, setOverlayWidth] = useState(0);

  useEffect(() => {
    if (!dailyForecast) return;

    const targetWidth = dailyForecast.clouds;

    function animateFill() {
      setOverlayWidth((prevWidth) => {
        const difference = targetWidth - prevWidth;
        const direction = difference > 0 ? 1 : -1;

        const incrementPerFrame =
          (direction * Math.abs(difference)) /
          (ANIMATION_DURATION_MS / 16.6667);

        const newWidth = prevWidth + incrementPerFrame;

        if (direction === 1) {
          return newWidth >= targetWidth ? targetWidth : newWidth;
        } else {
          return newWidth <= targetWidth ? targetWidth : newWidth;
        }
      });
    }

    const intervalId = setInterval(animateFill, 16.6667);

    return () => clearInterval(intervalId);
  }, [dailyForecast?.clouds]);

  return (
    <>
      {isPlaceHolder && (
        <div className={classNames(styles.card, styles.placeholder)}>
          <div className={classNames(styles.cardSection, styles.header)}>
            <h1>Cloud Cover</h1>
          </div>
          <div className={classNames(styles.cardSection, styles.body)}>
            <div className={styles.imagePlaceholder}></div>
            <h1>50%</h1>
          </div>
        </div>
      )}
      {dailyForecast && (
        <div className={styles.card}>
          <div className={classNames(styles.cardSection, styles.header)}>
            <h1>Cloud Cover</h1>
          </div>
          <div className={classNames(styles.cardSection, styles.body)}>
            <div
              key={dailyForecast.day}
              className={classNames(styles.bodyContent, styles.fadeIn)}
            >
              <div className={styles.imageOverlayWrapper}>
                <div
                  className={styles.coverageOverlay}
                  style={{ width: `${overlayWidth}%` }}
                ></div>
                <Image
                  priority={true}
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
        </div>
      )}
    </>
  );
}

export default CloudCard;
