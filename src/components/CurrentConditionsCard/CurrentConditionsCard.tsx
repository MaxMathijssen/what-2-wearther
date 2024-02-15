import styles from "./currentConditionsCard.module.css";
import classNames from "classnames";
import Image from "next/legacy/image";
import { DailyForecast } from "@/typings/types";

interface CurrentConditionsCardProps {
  title?: string;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
}

function CurrentConditionsCard({
  title,
  dailyForecast,
  isPlaceHolder,
}: CurrentConditionsCardProps): React.JSX.Element {
  return (
    <>
      {isPlaceHolder && (
        <div className={classNames(styles.card, styles.placeholder)}>
          <div className={classNames(styles.cardSection, styles.header)}>
            <h1>{title}</h1>
          </div>
          <div className={classNames(styles.cardSection, styles.body)}>
            <div className={styles.imagePlaceholder}></div>
            <h1>Rain</h1>
            <h2>15°`</h2>
            <h3>Feels like 15°</h3>
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
              className={classNames(styles.bodyContent, styles.fadeIn)}
            >
              <Image
                src={dailyForecast.iconPath}
                width={100}
                height={100}
                alt={dailyForecast.weather}
              />
              <h1>{dailyForecast.weather}</h1>
              <h2>
                {dailyForecast.temp.current
                  ? `${dailyForecast.temp.current}°`
                  : `${dailyForecast.temp.max}°`}
              </h2>
              <h3>{`Feels like ${
                dailyForecast.feels_like.current
                  ? dailyForecast.feels_like.current
                  : dailyForecast.feels_like.day
              }°`}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentConditionsCard;
