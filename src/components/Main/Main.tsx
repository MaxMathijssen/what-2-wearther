"use client";

import { useContext, useEffect, useState, useRef } from "react";
import Forecast from "../Forecast";
import Wardrobe from "../Wardrobe";
import styles from "./main.module.scss";
import { WardrobeContext } from "@/providers/WardrobeProvider";

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
      // Prevent transitions on initial load
      setTransitionState("forecastEntering");
    }
  }, [wardrobeEnabled]);

  return (
    <div style={{ height: 1495 }} className={styles.outerContainer}>
      <div ref={containerRef} className={styles.container}>
        <div
          ref={forecastRef}
          className={`${styles.component} ${
            transitionState === "initial"
              ? ""
              : transitionState === "forecastEntering"
              ? styles.fadeInSlideInFromLeft
              : styles.fadeOutSlideOutToLeft
          }`}
        >
          <Forecast />
        </div>
        <div
          ref={wardrobeRef}
          className={`${styles.component} ${
            transitionState === "wardrobeEntering"
              ? styles.fadeInSlideInFromRight
              : transitionState === "initial"
              ? styles.hidden
              : styles.fadeOutSlideOutToRight
          }`}
        >
          <Wardrobe />
        </div>
      </div>
    </div>
  );
}

export default Main;
