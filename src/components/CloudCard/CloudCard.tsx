import { useState, useEffect, useRef, memo } from "react";
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
  const requestRef = useRef<number>();
  const prevCloudsRef = useRef<number>(0);

  useEffect(() => {
    if (!dailyForecast) return;

    const targetWidth = dailyForecast.clouds;
    const startWidth = prevCloudsRef.current || 0;
    let start: DOMHighResTimeStamp | null = null;

    const animate = (timestamp: DOMHighResTimeStamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const duration = ANIMATION_DURATION_MS;
      const step = Math.abs(targetWidth - startWidth) * (progress / duration);
      const newWidth =
        startWidth < targetWidth ? startWidth + step : startWidth - step;

      if (
        (startWidth < targetWidth && newWidth < targetWidth) ||
        (startWidth > targetWidth && newWidth > targetWidth)
      ) {
        setOverlayWidth(newWidth);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setOverlayWidth(targetWidth);
        prevCloudsRef.current = targetWidth;
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
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

export default memo(CloudCard);
