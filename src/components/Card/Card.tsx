import { PropsWithChildren } from "react";
import styles from "./card.module.css";
import classNames from "classnames";

interface CardProps extends PropsWithChildren {
  header?: string;
  title?: string;
  isPlaceHolder: boolean;
}

function Card({
  title,
  isPlaceHolder,
  children,
}: CardProps): React.JSX.Element {
  return (
    <div className={styles.card}>
      <div className={classNames(styles.cardSection, styles.topSection)}>
        <h1>{title}</h1>
      </div>
      <div className={classNames(styles.cardSection, styles.bottomSection)}>
        {children}
      </div>
    </div>
  );
}

export default Card;
