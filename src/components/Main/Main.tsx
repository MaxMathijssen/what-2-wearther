"use client";

import { useContext, useEffect, useState, useRef } from "react";
import Forecast from "../Forecast";
import Wardrobe from "../Wardrobe";
import styles from "./main.module.scss";
import { WardrobeContext } from "@/providers/WardrobeProvider";

function Main() {
  const { wardrobeEnabled } = useContext(WardrobeContext);
  const [transitionState, setTransitionState] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);
  const wardrobeRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState("auto");

  useEffect(() => {
    if (wardrobeEnabled) {
      setTransitionState("wardrobeEntering");
    } else {
      setTransitionState("forecastEntering");
    }
  }, [wardrobeEnabled]);

  useEffect(() => {
    const updateContainerHeight = () => {
      let activeHeight = 0;
      if (forecastRef.current && wardrobeRef.current) {
        const forecastHeight = forecastRef.current.offsetHeight;
        const wardrobeHeight = wardrobeRef.current.offsetHeight;
        activeHeight = wardrobeEnabled ? wardrobeHeight : forecastHeight;
      }
      setContainerHeight(`${activeHeight}px`);
    };

    updateContainerHeight();
  }, [wardrobeEnabled]);

  return (
    <div style={{ height: containerHeight }} className={styles.outerContainer}>
      <div ref={containerRef} className={styles.container}>
        <div
          ref={forecastRef}
          className={`${styles.component} ${
            transitionState === "forecastEntering"
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
