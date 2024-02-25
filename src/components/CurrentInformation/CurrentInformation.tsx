"use client";

import { useContext } from "react";
import { getFormattedDate } from "@/helpers/utils";
import { LocationContext } from "../../providers/LocationProvider";
import classNames from "classnames";
import styles from "./CurrentInformation.module.scss";

function CurrentInformation() {
  const { location } = useContext(LocationContext);
  const currentDate = getFormattedDate();

  return (
    <div className={styles.currentInformation}>
      {location && (
        <div className={styles.body}>{`${currentDate}${`, `}${
          location.city
        }`}</div>
      )}
      {!location && (
        <div className={classNames(styles.body, styles.placeholder)}>
          Utrecht
        </div>
      )}
    </div>
  );
}

export default CurrentInformation;
