"use client";

import { useContext, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { getFormattedDate, getCurrentTime } from "@/helpers/utils";
import { API_KEY } from "@/helpers/constants";
import { LocationContext } from "../../providers/LocationProvider";
import { ForecastContext } from "../../providers/ForecastProvider";
import classNames from "classnames";
import styles from "./CurrentInformation.module.scss";

function CurrentInformation() {
  const { setCoordinates, location } = useContext(LocationContext);
  const { setSearched } = useContext(ForecastContext);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  const endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${API_KEY}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const currentDate = getFormattedDate();

  async function handleSubmit(event: FormEvent) {
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

    setStatus("loading");

    const response = await fetch(endPoint);
    const json = await response.json();

    if (json) {
      setStatus("success");
      console.log(json[0].lat, json[0].lon);
      setCoordinates({ latitude: json[0].lat, longitude: json[0].lon }, "user");
      setSearchInput("");
      setSearched(true);
    } else {
      setStatus("error");
    }
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
                  disabled={status === "loading"}
                  className={styles.inputField}
                  value={searchInput}
                  onChange={handleOnChange}
                  placeholder={
                    status === "loading" ? "Submitting…" : "Search..."
                  }
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
