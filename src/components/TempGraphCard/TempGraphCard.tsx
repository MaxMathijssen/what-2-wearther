import { PropsWithChildren, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import useVisibleHourlyForecast from "@/hooks/useVisibleHourlyForecast";
import styles from "./tempGraphCard.module.scss";

interface DataPoint {
  x: string; // Represents time
  y: string; // Represents temperature
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

  useEffect(() => {
    if (visibleHourlyForecast) {
      const transformedData: DataSet = {
        id: "temps",
        data: visibleHourlyForecast.map((item) => ({
          x: item.hour,
          y: `${item.temp}°`,
        })),
      };
      setGraphData([transformedData]); // This ensures graphData is always an array
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
            margin={{ top: 50, right: 20, bottom: 25, left: 75 }}
            xScale={{ type: "point" }} // If `x` represents categories like hours.
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat="time:%Hh"
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
              tickSize: 10,
              tickPadding: 10,
              tickRotation: 0,
              legend: "",
              legendOffset: 0,
              legendPosition: "middle",
              truncateTickAt: 0,
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
