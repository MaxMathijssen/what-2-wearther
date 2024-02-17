import { useState, useEffect, PropsWithChildren, memo } from "react";
import CircularProgress from "@mui/joy/CircularProgress";

interface GradualCircularProgressProps extends PropsWithChildren {
  targetValue: number;
  duration: number;
}

function GradualCircularProgress({
  targetValue,
  duration,
  children,
  ...delegatedProps
}: GradualCircularProgressProps) {
  const [progress, setProgress] = useState(0);
  console.log("Gradual render");

  useEffect(() => {
    const startTime = Date.now();

    const totalChangeNeeded = targetValue - progress;
    const changePerMs = totalChangeNeeded / (duration * 20);

    const timer = setInterval(() => {
      setProgress((currentProgress) => {
        const elapsedTime = Date.now() - startTime;
        const expectedProgress = elapsedTime * changePerMs + currentProgress;

        if (
          (changePerMs > 0 && expectedProgress >= targetValue) ||
          (changePerMs < 0 && expectedProgress <= targetValue)
        ) {
          clearInterval(timer);
          return targetValue;
        }

        return expectedProgress;
      });
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
}

export default memo(GradualCircularProgress);
