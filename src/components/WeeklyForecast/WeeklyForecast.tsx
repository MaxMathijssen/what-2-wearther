"use client";

import { useContext, useId, memo } from "react";
import { ForecastContext } from "../../providers/ForecastProvider";
import WeatherCard from "../WeatherCard";
import { DailyForecast, WardrobeItem } from "@/typings/types";
import { range } from "@/helpers/utils";
import { motion } from "framer-motion";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import { Status, BodyPart } from "@/typings/types";

import styles from "./weeklyForecast.module.scss";

function WeeklyForecast(): React.JSX.Element {
  const { weeklyForecast, selectedDailyForecast, selectDailyForecast, error } =
    useContext(ForecastContext);
  const { avatar, wardrobeItems } = useContext(WardrobeContext);

  const activeWardrobeItems = wardrobeItems.filter(
    (wardrobeItem) =>
      wardrobeItem.status === Status.Wardrobe ||
      wardrobeItem.status === Status.Avatar
  );
  const id = useId();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      {weeklyForecast &&
        weeklyForecast.map((dailyForecast: DailyForecast) => {
          const isSelected = dailyForecast.dt === selectedDailyForecast?.dt;
          const temp = dailyForecast.temp.current
            ? dailyForecast.temp.current
            : dailyForecast.temp.max;
          const headItem =
            avatar?.isComplete && avatar.head !== undefined
              ? avatar.head
              : undefined;
          const bodyItem = activeWardrobeItems.find(
            (bodyItem: WardrobeItem) =>
              bodyItem.tempRange.max >= temp &&
              bodyItem.tempRange.min <= temp &&
              bodyItem.bodyPart === BodyPart.Body
          );
          const legItem = activeWardrobeItems.find(
            (bodyItem: WardrobeItem) =>
              bodyItem.tempRange.max >= temp &&
              bodyItem.tempRange.min <= temp &&
              bodyItem.bodyPart === BodyPart.Legs
          );

          console.log(temp, wardrobeItems, activeWardrobeItems);
          return (
            <div key={dailyForecast.dt} className={styles.weatherCardContainer}>
              {dailyForecast === selectedDailyForecast && (
                <motion.div layoutId={id} className={styles.selectedBorder} />
              )}
              <WeatherCard
                isSelected={isSelected}
                isError={false}
                isPlaceHolder={false}
                dailyForecast={dailyForecast}
                selectDailyForecast={() =>
                  selectDailyForecast(dailyForecast, null)
                }
                headItem={headItem}
                bodyItem={bodyItem}
                legItem={legItem}
              />
            </div>
          );
        })}

      {error &&
        range(0, 7).map((index) => {
          return (
            <WeatherCard
              isSelected={false}
              key={index}
              isError={true}
              isPlaceHolder={false}
              dailyForecast={null}
              headItem={undefined}
              bodyItem={undefined}
              legItem={undefined}
            />
          );
        })}
      {!weeklyForecast ||
        (weeklyForecast.length === 0 &&
          range(0, 7).map((index) => (
            <div key={index} className={styles.weatherCardContainer}>
              <WeatherCard
                isSelected={false}
                key={index}
                isError={false}
                isPlaceHolder={true}
                dailyForecast={null}
                headItem={undefined}
                bodyItem={undefined}
                legItem={undefined}
              />
            </div>
          )))}
    </div>
  );
}

export default memo(WeeklyForecast);
