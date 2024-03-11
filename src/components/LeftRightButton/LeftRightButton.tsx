import { memo } from "react";
import Image from "next/image";
import styles from "./leftRightButton.module.scss";

export enum Direction {
  LEFT,
  RIGHT,
}

interface LeftRightButtonProps {
  direction: Direction;
  onClick: (() => void) | null;
}

function LeftRightButton({ direction, onClick }: LeftRightButtonProps) {
  const isLeft = direction === Direction.LEFT;
  const imgSrc = isLeft ? "/left-arrow.png" : "/right-arrow.png";
  const btnClass = isLeft ? styles.btnPrevHours : styles.btnNextHours;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={btnClass} onClick={handleClick}>
      <Image
        src={imgSrc}
        width={30}
        height={30}
        alt={isLeft ? "Previous hours" : "Next hours"}
      />
    </div>
  );
}

export default memo(LeftRightButton);
