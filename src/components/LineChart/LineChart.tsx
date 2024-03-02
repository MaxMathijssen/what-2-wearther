import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";

interface LineChartProps {
  graphData: Serie[];
  xAxisTicks: string[];
  yAxisTicks: number[];
  minYValueAxisValue: number | "auto";
  maxYAxisValue: number | "auto";
}

function LineChart({
  graphData,
  xAxisTicks,
  yAxisTicks,
  minYValueAxisValue,
  maxYAxisValue,
}: LineChartProps) {
  return (
    <ResponsiveLine
      data={graphData}
      margin={{ top: 50, right: 50, bottom: 30, left: 75 }}
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
      tooltip={({ point }) => (
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
      )}
    />
  );
}

export default LineChart;
