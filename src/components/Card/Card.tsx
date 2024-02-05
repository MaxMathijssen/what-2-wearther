import { PropsWithChildren } from "react";
import styles from "./card.module.css";

function Card({ children }: PropsWithChildren) {
  return (
    <div className={styles.card}>
      <h2>{children}</h2>
    </div>
  );
}

export default Card;
