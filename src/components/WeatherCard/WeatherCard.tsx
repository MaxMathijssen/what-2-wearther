import Card from "../Card";
import { DailyForecast } from "@/typings/types";
import { LoremIpsum } from "lorem-ipsum";

import { random } from "@/helpers/utils";

import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  isError: boolean;
  isLoading: boolean;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
}

const lorem = new LoremIpsum();

function WeatherCard({
  isError,
  isPlaceHolder,
  dailyForecast,
}: WeatherCardProps): React.JSX.Element {
  return (
    <>
      {isError && <Card>Something went wrong!</Card>}
      {isPlaceHolder && (
        <Card header={"Mock"} title={"Mock"} subTitle={"Mock"}>
          {"Mock"}
        </Card>
      )}
      {dailyForecast && (
        <Card
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
