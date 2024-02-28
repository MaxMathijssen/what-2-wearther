import { PropsWithChildren } from "react";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import styles from "./TempGraphCard.module.scss";
import classNames from "classnames";

interface TempGraphCardProps extends PropsWithChildren {
  dailyForecast: DailyForecast | null;
  isPlaceHolder: boolean;
}

function TempGraphCard({ dailyForecast, isPlaceHolder }: TempGraphCardProps) {
  return (
    dailyForecast && (
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Temperature</h1>
        </div>
        <div className={styles.body}></div>
      </div>
    )
  );
}

export default TempGraphCard;
