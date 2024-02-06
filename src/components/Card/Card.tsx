import { PropsWithChildren } from "react";
import styles from "./card.module.css";

function Card({ children }: PropsWithChildren) {
  return (
    <div className={styles.card}>
      <h1>{children}</h1>
    </div>
  );
}

export default Card;
