import React, { useState, useEffect, PropsWithChildren } from "react";
import CircularProgress from "@mui/joy/CircularProgress";

interface GradualCircularProgressProps extends PropsWithChildren {
  targetValue: number;
  duration: number;
}

const GradualCircularProgress: React.FC<GradualCircularProgressProps> = ({
  targetValue,
  duration,
  children,
  ...delegatedProps
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(
        (elapsedTime / duration) * targetValue,
        targetValue
      );

      setProgress(progress);

      if (progress === targetValue) {
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return (
    <CircularProgress
      determinate
      value={progress}
      size="lg"
      {...delegatedProps}
    >
      {children}
    </CircularProgress>
  );
};

export default GradualCircularProgress;
