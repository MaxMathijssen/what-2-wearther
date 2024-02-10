import { PropsWithChildren } from "react";
import styles from "./card.module.css";
import classNames from "classnames";

interface CardProps extends PropsWithChildren {
  header?: string;
  title?: string;
  subTitle?: string;
  isPlaceHolder: boolean;
}

function Card({
  header,
  title,
  subTitle,
  isPlaceHolder,
  children,
  ...delegated
}: CardProps) {
  return (
    <div
      className={classNames(styles.card, {
        [styles.placeholder]: isPlaceHolder,
      })}
      {...delegated}
    >
      <div className={styles.head}>
        <h3>{header}</h3>
      </div>
      <h2>{title}</h2>
      <h4>{subTitle}</h4>
      <span>
        <p>{children}</p>
      </span>
    </div>
  );
}

export default Card;
