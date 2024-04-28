import { MouseEventHandler, MouseEvent, memo } from "react";
import Image from "next/image";
import styles from "./LeftRightButton.module.scss";

export enum Direction {
  LEFT,
  RIGHT,
}

interface LeftRightButtonProps {
  direction: Direction;
  onClick: (() => void) | null | MouseEventHandler<any> | undefined;
  style?: React.CSSProperties; // Accept a style prop
}

function LeftRightButton({ direction, onClick, style }: LeftRightButtonProps) {
  const isLeft = direction === Direction.LEFT;
  const imgSrc = isLeft ? "/left-arrow.png" : "/right-arrow.png";
  const btnClass = isLeft ? styles.btnPrevHours : styles.btnNextHours;

  // Modified handleClick to accept a MouseEvent and pass it to onClick
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      // Assuming onClick can handle a MouseEvent argument
      onClick(event);
    }
  };

  return (
    <div className={btnClass} onClick={handleClick} style={style}>
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
