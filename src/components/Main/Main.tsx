"use client";

import { useContext, useEffect, useState } from "react";
import Forecast from "../Forecast";
import Wardrobe from "../Wardrobe";
import styles from "./main.module.scss";
import { WardrobeContext } from "@/providers/WardrobeProvider";

function Main() {
  const { wardrobeEnabled } = useContext(WardrobeContext);
  const [transitionState, setTransitionState] = useState("");

  useEffect(() => {
    // When wardrobeEnabled changes, set the transition state appropriately
    if (wardrobeEnabled) {
      setTransitionState("wardrobeEntering");
    } else {
      setTransitionState("forecastEntering");
    }
  }, [wardrobeEnabled]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.component} ${
          transitionState === "forecastEntering"
            ? styles.fadeInSlideInFromLeft
            : styles.fadeOutSlideOutToLeft
        }`}
      >
        <Forecast />
      </div>
      <div
        className={`${styles.component} ${
          transitionState === "wardrobeEntering"
            ? styles.fadeInSlideInFromRight
            : styles.fadeOutSlideOutToRight
        }`}
      >
        <Wardrobe />
      </div>
    </div>
  );
}

export default Main;
