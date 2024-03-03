import { memo } from "react";
import Image from "next/image";
import styles from "./hoursButton.module.scss";

export enum Direction {
  LEFT,
  RIGHT,
}

interface HoursButtonProps {
  direction: Direction;
  onClick: () => void;
}

function HoursButton({ direction, onClick }: HoursButtonProps) {
  const isLeft = direction === Direction.LEFT;
  const imgSrc = isLeft ? "/left-arrow.png" : "/right-arrow.png";
  const btnClass = isLeft ? styles.btnPrevHours : styles.btnNextHours;

  return (
    <div className={btnClass} onClick={onClick}>
      <Image
        src={imgSrc}
        width={30}
        height={30}
        alt={isLeft ? "Previous hours" : "Next hours"}
      />
    </div>
  );
}

export default memo(HoursButton);
