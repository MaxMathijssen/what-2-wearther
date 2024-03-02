import { PropsWithChildren, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { DailyForecast, HourlyForecast } from "@/typings/types";
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
  console.log(visibleHourlyForecast);

  const [graphData, setGraphData] = useState<GraphData>([]);
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
            xScale={{ type: "point" }} // If `x` represents categories like hours.
            yScale={{
              type: "linear",
              min: minYValueAxisValue,
              max: maxYAxisValue, // Use the dynamically adjusted max value
              stacked: false,
              reverse: false,
            }}
            yFormat={(value) => `${value}°`}
            curve="natural"
            axisTop={{
              tickSize: 0,
              tickPadding: 15,
              tickRotation: 1,
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
              tickValues: yAxisTicks, // Directly use the calculated whole number ticks
            }}
            enableGridY={false}
            colors={{ scheme: "category10" }}
            pointSize={13}
            pointColor={{ from: "color", modifiers: [] }}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.05}
            enableCrosshair={false}
            useMesh={true}
            legends={[]}
          />
        </div>
      </div>
    )
  );
}

export default TempGraphCard;
