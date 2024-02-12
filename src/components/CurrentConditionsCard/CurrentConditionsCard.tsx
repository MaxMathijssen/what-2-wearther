import { PropsWithChildren } from "react";
import styles from "./currentConditionsCard.module.css";
import classNames from "classnames";

interface CurrentConditionsCardProps extends PropsWithChildren {
  header?: string;
  title?: string;
  isPlaceHolder: boolean;
}

function CurrentConditionsCard({
  title,
  isPlaceHolder,
  children,
}: CurrentConditionsCardProps): React.JSX.Element {
  return (
    <div className={styles.card}>
      <div className={classNames(styles.cardSection, styles.header)}>
        <h1>{title}</h1>
      </div>
      <div className={classNames(styles.cardSection, styles.body)}>
        {children}
      </div>
    </div>
  );
}

export default CurrentConditionsCard;
