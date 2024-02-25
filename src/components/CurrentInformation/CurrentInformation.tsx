"use client";

import { useContext, useState, useEffect } from "react";
import { getFormattedDate, getCurrentTime } from "@/helpers/utils";
import { LocationContext } from "../../providers/LocationProvider";
import classNames from "classnames";
import styles from "./CurrentInformation.module.scss";

function CurrentInformation() {
  const { location } = useContext(LocationContext);
  const [searchInput, setSearchInput] = useState("");
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
          <div className={styles.bodyText}>
            {`${currentDate}, `}
            <strong>{location.city}</strong>
            {` • ${currentTime}`}
          </div>
          <div className={styles.formContainer}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input
                id="search-input"
                className={styles.inputField}
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
                placeholder="Search…"
              />
            </form>
          </div>
          <div className={styles.spacer}></div>{" "}
        </div>
      )}
      {!location && (
        <div className={classNames(styles.body, styles.placeholder)}>
          Sunday 25 February, Utrecht • 2:59 PM
        </div>
      )}
    </div>
  );
}

export default CurrentInformation;
