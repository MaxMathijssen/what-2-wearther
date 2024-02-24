import { memo } from "react";
import { motion } from "framer-motion";

interface HourlyForecastIndicatorProps {
  valueStart: number;
  valueEnd: number;
}

function HourlyForecastIndicator({
  valueStart,
  valueEnd,
}: HourlyForecastIndicatorProps) {
  const totalRange = 47;
  const highlightStartPercentage = (valueStart / totalRange) * 100;
  const highlightEndPercentage = (valueEnd / totalRange) * 100;
  const highlightWidthPercentage =
    highlightEndPercentage - highlightStartPercentage;

  const variants = {
    initial: { width: 0, left: `${highlightStartPercentage}%` },
    animate: {
      width: `${highlightWidthPercentage}%`,
      left: `${highlightStartPercentage}%`,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        width: "88%",
        height: "15px",
        backgroundColor: "#8ecae6",
        borderRadius: "20px",
      }}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        style={{
          position: "absolute",
          height: "100%",
          backgroundColor: "#ffb703",
          borderRadius: "20px",
        }}
      />
    </div>
  );
}

export default memo(HourlyForecastIndicator);
