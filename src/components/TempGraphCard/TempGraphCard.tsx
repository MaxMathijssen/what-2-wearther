import { PropsWithChildren, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import useVisibleHourlyForecast from "@/hooks/useVisibleHourlyForecast";
import styles from "./tempGraphCard.module.scss";

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
  const { visibleHourlyForecast } = useVisibleHourlyForecast(dailyForecast);
  const [graphData, setGraphData] = useState<GraphData>([]);
  const [xAxisTicks, setXAxisTicks] = useState<string[]>([]);
  const [yAxisTicks, setYAxisTicks] = useState<number[]>([]);
  const [maxYAxisValue, setMaxYAxisValue] = useState<number | "auto">("auto");
  const [minYValueAxisValue, setMinYValueAxisValue] = useState<number | "auto">(
    "auto"
  );

  console.log(visibleHourlyForecast);

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
    dailyForecast && (
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Temperature</h1>
        </div>
        <div className={styles.body}>
          <ResponsiveLine
            data={graphData}
            margin={{ top: 40, right: 20, bottom: 20, left: 45 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: minYValueAxisValue,
              max: maxYAxisValue,
              stacked: false,
              reverse: false,
            }}
            yFormat={(value) => `${value}°`}
            curve="natural"
            axisTop={{
              tickValues: xAxisTicks,
              tickSize: 0,
              tickPadding: 20,
              tickRotation: -0.001,
              legend: "",
              legendOffset: 0,
              truncateTickAt: 0,
            }}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 10,
              tickRotation: 0,
              format: (value) => `${value}°`,
              tickValues: yAxisTicks,
            }}
            enableGridY={false}
            colors={{ scheme: "category10" }}
            pointSize={13}
            pointColor={{ from: "color", modifiers: [] }}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.1}
            areaBaselineValue={0}
            enableCrosshair={false}
            useMesh={true}
            legends={[]}
            defs={[
              {
                id: "gradient",
                type: "linearGradient",
                x1: "0%",
                y1: "0%",
                x2: "0%",
                y2: "40%",
                colors: [
                  { offset: 0, color: "#219ebc", opacity: 1 },
                  { offset: 100, color: "white", opacity: 1 },
                ],
              },
            ]}
            fill={[{ match: "*", id: "gradient" }]}
            tooltip={({ point }) => {
              return (
                <div
                  style={{
                    position: "relative",
                    background: "white",
                    padding: "9px 12px 8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "10px solid #ccc",
                      zIndex: 2,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-9px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "10px solid white",
                      zIndex: 3,
                    }}
                  />
                  {point.data.yFormatted}
                </div>
              );
            }}
          />
        </div>
      </div>
    )
  );
}

export default TempGraphCard;
