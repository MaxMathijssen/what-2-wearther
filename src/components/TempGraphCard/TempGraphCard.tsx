import { PropsWithChildren, useEffect, useState } from "react";
import LineChart from "../LineChart/LineChart";
import LeftRightButton, { Direction } from "../LeftRightButton";
import HourlyForecastIndicator from "../HourlyForecastIndicator";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import useVisibleHourlyForecast from "@/hooks/useVisibleHourlyForecast";
import Image from "next/legacy/image";
import styles from "./tempGraphCard.module.scss";
import classNames from "classnames";

interface DataPoint {
  x: string;
  y: number;
}

interface DataSet {
  id: string;
  data: DataPoint[];
}

type GraphData = DataSet[];

interface TempGraphCardProps extends PropsWithChildren {
  dailyForecast: DailyForecast | null;
  isPlaceHolder: boolean;
}

function TempGraphCard({ dailyForecast, isPlaceHolder }: TempGraphCardProps) {
  const { visibleHourlyForecast, handleNextHours, prevButtonVisible } =
    useVisibleHourlyForecast(dailyForecast);
  const [graphData, setGraphData] = useState<GraphData>([]);
  const [xAxisTicks, setXAxisTicks] = useState<string[]>([]);
  const [yAxisTicks, setYAxisTicks] = useState<number[]>([]);
  const [maxYAxisValue, setMaxYAxisValue] = useState<number | "auto">("auto");
  const [minYValueAxisValue, setMinYValueAxisValue] = useState<number | "auto">(
    "auto"
  );

  useEffect(() => {
    if (visibleHourlyForecast && visibleHourlyForecast.length > 0) {
      const transformedData = visibleHourlyForecast.map(
        (hourlyForecast: HourlyForecast) => ({
          x: hourlyForecast.hour_index === 0 ? "Now" : hourlyForecast.hour,
          y: hourlyForecast.temp,
        })
      );

      const dataSet: DataSet = {
        id: "temps",
        data: transformedData,
      };

      setGraphData([dataSet]);

      const tickValuesAxisTop = transformedData.map((d) => d.x).slice(0, -1);
      setXAxisTicks(tickValuesAxisTop);

      const allYValues = transformedData.map((item) => item.y);
      const minYValue = Math.floor(Math.min(...allYValues));
      const maxYValue = Math.ceil(Math.max(...allYValues));
      const buffer = 1;
      setMaxYAxisValue(maxYValue + buffer);
      setMinYValueAxisValue(minYValue - buffer);

      const wholeNumberTicks = Array.from(
        { length: maxYValue - minYValue + 1 },
        (_, i) => minYValue + i
      );
      setYAxisTicks(wholeNumberTicks);
    }
  }, [visibleHourlyForecast]);

  return (
    <>
      {isPlaceHolder && (
        <div className={classNames(styles.card, styles.placeholder)}>
          <div className={styles.header}>
            <h1>Temperature</h1>
          </div>
          <div className={styles.body}>
            <div className={styles.graphPlaceholder}></div>
          </div>
        </div>
      )}

      {dailyForecast && (
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Temperature</h1>
          </div>
          <div className={styles.body}>
            {prevButtonVisible && (
              <LeftRightButton
                onClick={() => handleNextHours(false)}
                direction={Direction.LEFT}
              />
            )}
            {dailyForecast && dailyForecast.hourly_forecast.length === 0 ? (
              <div
                key={dailyForecast.day}
                className={classNames(styles.noDataContainer, styles.fadeIn)}
              >
                <h2>Sorry!</h2>
                <Image
                  src="/man.webp"
                  width={100}
                  height={100}
                  alt="No hourly data"
                />
                <h3>
                  Hourly forecast data is only available for the next 48 hours
                </h3>
              </div>
            ) : (
              dailyForecast.hourly_forecast.length > 0 && (
                <div
                  className={classNames(styles.graphContainer, styles.fadeIn)}
                >
                  {visibleHourlyForecast !== null &&
                    dailyForecast.hourly_forecast.length > 0 && (
                      <div className={classNames(styles.indicatorContainer)}>
                        <HourlyForecastIndicator
                          valueStart={visibleHourlyForecast[0].hour_index}
                          valueEnd={
                            visibleHourlyForecast[
                              visibleHourlyForecast.length - 1
                            ].hour_index
                          }
                        />
                      </div>
                    )}
                  <LineChart
                    graphData={graphData}
                    xAxisTicks={xAxisTicks}
                    yAxisTicks={yAxisTicks}
                    minYValueAxisValue={minYValueAxisValue}
                    maxYAxisValue={maxYAxisValue}
                  />
                </div>
              )
            )}
            {dailyForecast.day_num !== 6 && (
              <LeftRightButton
                onClick={() => handleNextHours(true)}
                direction={Direction.RIGHT}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TempGraphCard;
