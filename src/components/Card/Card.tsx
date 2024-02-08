import { PropsWithChildren } from "react";
import styles from "./card.module.css";
import classNames from "classnames";

interface CardProps extends PropsWithChildren {
  header?: string;
  title?: string;
  subTitle?: string;
  isPlaceHolder: boolean;
}

function Card({ header, title, subTitle, children }: CardProps) {
  return (
    <div className={classNames(styles.card, styles.placeholder)}>
      <h3>{header}</h3>
      <h2>{title}</h2>
      <h4>{subTitle}</h4>
      <span>
        <p>{children}</p>
      </span>
    </div>
  );
}

export default Card;
