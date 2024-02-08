import Card from "../Card";
import { DailyForecast } from "@/typings/types";

import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  isError: boolean;
  isLoading: boolean;
  isFirstPlaceHolder: boolean;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
}

function WeatherCard({
  isError,
  isFirstPlaceHolder,
  isPlaceHolder,
  dailyForecast,
}: WeatherCardProps): React.JSX.Element {
  return (
    <>
      {isError && <Card isPlaceHolder={false}>Something went wrong!</Card>}
      {isPlaceHolder && (
        <Card
          isPlaceHolder={true}
          header={"Mockday"}
          title={isFirstPlaceHolder ? "7 °C" : undefined}
          subTitle={"Mock"}
        >
          {"H:12°C L:7°C"}
        </Card>
      )}
      {dailyForecast && (
        <Card
          isPlaceHolder={false}
          header={dailyForecast?.day}
          title={
            dailyForecast?.temp.current
              ? `${Math.round(dailyForecast.temp.current)} °C`
              : undefined
          }
          subTitle={dailyForecast?.weather}
        >
          {dailyForecast?.temp
            ? `H:${Math.round(dailyForecast.temp.max)}°C L:${Math.round(
                dailyForecast.temp.min
              )}°C`
            : undefined}
        </Card>
      )}
    </>
  );
}

export default WeatherCard;
