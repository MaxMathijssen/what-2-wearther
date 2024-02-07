"use client";

import { PropsWithChildren } from "react";
import styles from "./card.module.css";

interface CardProps extends PropsWithChildren {
  header?: string;
  title?: string;
  subTitle?: string;
}

function Card({ header, title, subTitle, children }: CardProps) {
  return (
    <div className={styles.card}>
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
