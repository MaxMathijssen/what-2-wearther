import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import styles from "./TempGraphCard.module.scss";
import classNames from "classnames";

interface TempGraphCardProps extends PropsWithChildren {
  dailyForecast: DailyForecast | null;
  isPlaceHolder: boolean;
}

function TempGraphCard({ dailyForecast, isPlaceHolder }: TempGraphCardProps) {
  const [chartWidth, setChartWidth] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current?.clientWidth) {
        setChartWidth(chartContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    dailyForecast && (
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Temperature</h1>
        </div>
        <div className={styles.body} ref={chartContainerRef}>
          <LineChart
            width={chartWidth - 100}
            height={250}
            data={dailyForecast.hourly_forecast}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    )
  );
}

export default TempGraphCard;
