import { PropsWithChildren, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { DailyForecast } from "@/typings/types";
import useVisibleHourlyForecast from "@/hooks/useVisibleHourlyForecast";
import styles from "./tempGraphCard.module.scss";

interface DataPoint {
  x: string; // Represents time
  y: number; // Represents temperature as a number
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

  useEffect(() => {
    // Assuming `visibleHourlyForecast` processing and `transformedData` setup
    // Calculate yAxisTicks based on your dataset
    if (visibleHourlyForecast && visibleHourlyForecast.length > 0) {
      // Dummy transformation and yAxisTicks calculation for example
      // Ensure this logic matches your actual data processing needs
      const transformedData: DataSet = {
        id: "temps",
        data: visibleHourlyForecast.map((item) => ({
          x: item.hour,
          y: item.temp, // Ensure this is just a numeric value
        })),
      };
      setGraphData([transformedData]);

      // Example calculation for yAxisTicks, adjust as needed
      const allYValues = visibleHourlyForecast.map((item) => item.temp);
      const minYValue = Math.floor(Math.min(...allYValues));
      const maxYValue = Math.ceil(Math.max(...allYValues));
      const wholeNumberTicks = Array.from(
        { length: maxYValue - minYValue + 1 },
        (_, i) => minYValue + i
      );
      const buffer = 1; // Adjust the buffer as needed
      setMaxYAxisValue(maxYValue + buffer);
      setMinYValueAxisValue(minYValue - buffer);

      setYAxisTicks(wholeNumberTicks);

      if (graphData && graphData.length > 0) {
        const tickValuesAxisTop = transformedData.data
          .map((d) => d.x)
          .slice(0, -1);
        setXAxisTicks(tickValuesAxisTop);
      }
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
            margin={{ top: 30, right: 20, bottom: 0, left: 50 }}
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
              tickPadding: 15,
              tickRotation: -0.001,
              legend: "",
              legendOffset: 0,
              truncateTickAt: 0,
            }}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
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
            areaBaselineValue={0} // Specify the baseline value for the area fill if needed
            enableCrosshair={false}
            useMesh={true}
            legends={[]}
            defs={[
              {
                id: "gradient",
                type: "linearGradient",
                // Set the gradient to be vertical
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
          />
        </div>
      </div>
    )
  );
}

export default TempGraphCard;
