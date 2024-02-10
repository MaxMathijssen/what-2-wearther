import { PropsWithChildren } from "react";
import styles from "./card.module.css";
import classNames from "classnames";
import { DailyForecast } from "@/typings/types";

interface CardProps extends PropsWithChildren {
  header?: string;
  title?: string;
  subTitle?: string;
  isPlaceHolder: boolean;
  dailyForecast?: DailyForecast;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Card({
  header,
  title,
  subTitle,
  isPlaceHolder,
  children,
  dailyForecast,
  onClick,
  ...delegated
}: CardProps) {
  return (
    <button className={styles.cardBtn} onClick={onClick}>
      <div
        className={classNames(styles.card, {
          [styles.placeholder]: isPlaceHolder,
        })}
        {...delegated}
      >
        <h3>{header}</h3>
        <h2>{title}</h2>
        <h4>{subTitle}</h4>
        <span>
          <p>{children}</p>
        </span>
      </div>
    </button>
  );
}

export default Card;
