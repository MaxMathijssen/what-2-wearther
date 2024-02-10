import { MouseEventHandler } from "react";
import { DailyForecast } from "@/typings/types";

import styles from "./WeatherCard.module.css";
import classNames from "classnames";

interface WeatherCardProps {
  isError: boolean;
  isLoading: boolean;
  isFirstPlaceHolder: boolean;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
  onClick?: (dailyForecast: DailyForecast) => void;
}

function WeatherCard({
  isError,
  isFirstPlaceHolder,
  isPlaceHolder,
  dailyForecast,
  isLoading,
  onClick,
  ...delegated
}: WeatherCardProps): React.JSX.Element {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick && dailyForecast) {
      onClick(dailyForecast);
    }
  };

  return (
    <>
      {isError && (
        <div className={styles.cardDiv}>
          <div className="top-section"></div>
          <div className="bottom-section"></div>
        </div>
      )}
      {isPlaceHolder && (
        <div className={styles.cardDiv}>
          <div className="top-section"></div>
          <div className="bottom-section"></div>
        </div>
      )}
      {dailyForecast && (
        <div className={styles.clickableCard} onClick={handleClick}>
          <div className={classNames(styles.cardSection, styles.topSection)}>
            <div className={styles.leftColumn}>Top Left</div>
            <div className={styles.rightColumn}>
              {dailyForecast.temp.current
                ? dailyForecast.temp.current
                : dailyForecast.temp.max}
            </div>
          </div>
          <div className={classNames(styles.cardSection, styles.bottomSection)}>
            <div className={styles.leftColumn}>12</div>
            <div className={styles.rightColumn}>12</div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherCard;
