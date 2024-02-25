"use client";

import { useContext, useState, useEffect } from "react";
import { getFormattedDate, getCurrentTime } from "@/helpers/utils";
import { LocationContext } from "../../providers/LocationProvider";
import classNames from "classnames";
import styles from "./CurrentInformation.module.scss";

function CurrentInformation() {
  const { location } = useContext(LocationContext);
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const currentDate = getFormattedDate();

  return (
    <div className={styles.currentInformation}>
      {location && (
        <div className={styles.body}>
          {`${currentDate}, `}
          <strong>{location.city}</strong>
          {` • ${currentTime}`}
        </div>
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
