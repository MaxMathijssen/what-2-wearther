"use client";

import { useContext } from "react";
import WeeklyForecast from "@/components/WeeklyForecast";
import DailyForecast from "@/components/DailyForecast";
import styles from "./main.module.scss";
import { WardrobeContext } from "@/providers/WardrobeProvider";

function Main() {
  const { setWardrobeEnabled, wardrobeEnabled } = useContext(WardrobeContext);

  return (
    <>
      {!wardrobeEnabled && (
        <main className={styles.main}>
          <WeeklyForecast />
          <DailyForecast />
        </main>
      )}
      {wardrobeEnabled && <main className={styles.main}></main>}
    </>
  );
}

export default Main;
