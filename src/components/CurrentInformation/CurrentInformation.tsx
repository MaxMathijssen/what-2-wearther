"use client";

import { useContext, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { getFormattedDate, getCurrentTime } from "@/helpers/utils";
import { LocationContext } from "../../providers/LocationProvider";
import classNames from "classnames";
import styles from "./CurrentInformation.module.scss";

function CurrentInformation() {
  const { location } = useContext(LocationContext);
  const [searchInput, setSearchInput] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setValidationMessage("");

    if (!searchInput.trim()) {
      setValidationMessage("Please enter a search term");
      return;
    }

    const lettersOnly = /^[A-Za-z]+$/;
    if (!searchInput.match(lettersOnly)) {
      setValidationMessage("Please enter only letters");
      return;
    }

    setSearchInput("");
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
    if (validationMessage) {
      setValidationMessage("");
    }
  }

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
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <input
                  id="search-input"
                  className={styles.inputField}
                  value={searchInput}
                  onChange={handleOnChange}
                  placeholder="Search…"
                />
                {validationMessage && (
                  <div
                    className={`${styles.validationMessage} ${
                      validationMessage ? styles.show : ""
                    }`}
                  >
                    {validationMessage}
                  </div>
                )}
              </div>
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
