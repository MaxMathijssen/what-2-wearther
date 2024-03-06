"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import Forecast from "../Forecast";
import Wardrobe from "../Wardrobe";
import styles from "./main.module.scss";

function Main() {
  const { wardrobeEnabled } = useContext(WardrobeContext);
  const [transitionState, setTransitionState] = useState("initial");
  const containerRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);
  const wardrobeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wardrobeEnabled) {
      setTransitionState("wardrobeEntering");
    } else if (transitionState !== "initial") {
      setTransitionState("forecastEntering");
    }
  }, [wardrobeEnabled]);

  return (
    <div className={styles.outerContainer}>
      <div ref={containerRef} className={styles.container}>
        <div
          ref={forecastRef}
          className={`${styles.component} ${
            transitionState === "initial"
              ? ""
              : transitionState === "forecastEntering"
              ? styles.fadeInSlideInFromRight
              : styles.fadeOutSlideOutToRight
          }`}
        >
          <Forecast />
        </div>
        <div
          ref={wardrobeRef}
          className={`${styles.component} ${
            transitionState === "wardrobeEntering"
              ? styles.fadeInSlideInFromLeft
              : transitionState === "initial"
              ? styles.hidden
              : styles.fadeOutSlideOutToLeft
          }`}
        >
          <Wardrobe />
        </div>
      </div>
    </div>
  );
}

export default Main;
