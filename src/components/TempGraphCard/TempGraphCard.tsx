import { PropsWithChildren } from "react";
import { ResponsiveLine } from "@nivo/line";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import styles from "./tempGraphCard.module.scss";

interface TempGraphCardProps extends PropsWithChildren {
  dailyForecast: DailyForecast | null;
  isPlaceHolder: boolean;
}

function TempGraphCard({ dailyForecast, isPlaceHolder }: TempGraphCardProps) {
  const data = [
    {
      id: "hours",
      data: [
        { x: "A", y: "2019-05-29 04:00" },
        { x: "B", y: "2019-05-29 02:00" },
        { x: "C", y: "2019-05-29 07:00" },
        { x: "D", y: "2019-05-30 04:00" },
      ],
    },
  ];

  return (
    dailyForecast && (
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Temperature</h1>
        </div>
        <div className={styles.body}>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 20, bottom: 25, left: 75 }}
            xScale={{ type: "linear" }}
            xFormat=" >-"
            yScale={{
              type: "time",
              format: "%Y-%m-%d %H:%M",
              precision: "hour",
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
