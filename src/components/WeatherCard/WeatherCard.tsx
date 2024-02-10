import { MouseEventHandler } from "react";
import Card from "../Card";
import { DailyForecast } from "@/typings/types";

import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  isError: boolean;
  isLoading: boolean;
  isFirstPlaceHolder: boolean;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
  onClick?: (dailyForecast: DailyForecast) => void;
}

function WeatherCard({
  isError,
  isFirstPlaceHolder,
  isPlaceHolder,
  dailyForecast,
  isLoading,
  onClick,
  ...delegated
}: WeatherCardProps): React.JSX.Element {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick && dailyForecast) {
      onClick(dailyForecast);
    }
  };

  return (
    <>
      {isError && (
        <button className={styles.cardBtn}>
          <Card isPlaceHolder={false}>Something went wrong!</Card>
        </button>
      )}
      {isPlaceHolder && (
        <button className={styles.cardBtn}>
          <Card
            isPlaceHolder={true}
            header={"Mockday"}
            title={isFirstPlaceHolder ? "7 °C" : undefined}
            subTitle={"Mock"}
          >
            {"H:12°C L:7°C"}
          </Card>
        </button>
      )}
      {dailyForecast && (
        <button className={styles.cardBtn} onClick={handleClick}>
          <Card
            isPlaceHolder={false}
            header={dailyForecast?.day}
            title={
              dailyForecast?.temp.current
                ? `${Math.round(dailyForecast.temp.current)} °C`
                : undefined
            }
            subTitle={dailyForecast?.weather}
            {...delegated}
          >
            {dailyForecast?.temp
              ? `H:${Math.round(dailyForecast.temp.max)}°C L:${Math.round(
                  dailyForecast.temp.min
                )}°C`
              : undefined}
          </Card>
        </button>
      )}
    </>
  );
}

export default WeatherCard;
