import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/legacy/image";
import styles from "./dresser.module.scss";
import { CustomArrowProps } from "react-slick";
import classNames from "classnames";

const headItems = [
  <Image src="/head_bald.png" width={50} height={50} alt="Head bald" />,
  <Image src="/head_ginger.png" width={49} height={50} alt="Head ginger" />,
  <Image src="/head_blonde.png" width={50} height={50} alt="Head blonde" />,
  <Image src="/head_black.png" width={50} height={66} alt="Head black" />,
  <Image src="/head_beard.png" width={50} height={55} alt="Head beard" />,
  <Image src="/head_orange.png" width={50} height={62} alt="Head orange" />,
];
const bodyItems = [
  <Image src="/body_tanktop.png" width={50} height={71} alt="Body tanktop" />,
  <Image src="/body_hoodie.png" width={50} height={76} alt="Body hoodie" />,
  <Image src="/body_suit.png" width={50} height={70} alt="Body suit" />,
  <Image src="/body_tshirt.png" width={50} height={71} alt="Body t-shirt" />,
  <Image src="/body_jacket.png" width={50} height={70} alt="Body jacket" />,
  <Image src="/body_sweater.png" width={50} height={67} alt="Body sweater" />,
];
const legItems = [
  <Image src="/legs_yellow.png" width={50} height={90} alt="Legs yellow" />,
  <Image src="/legs_black.png" width={50} height={90} alt="Legs black" />,
  <Image src="/legs_shorts.png" width={50} height={90} alt="Legs shorts" />,
  <Image src="/legs_ripped.png" width={50} height={90} alt="Legs ripped" />,
  <Image src="/legs_suit.png" width={50} height={90} alt="Legs suit" />,
  <Image src="/legs_jeans.png" width={50} height={90} alt="Legs jeans" />,
];

function Dresser() {
  const settings = {
    dots: false, // Show dot indicators at the bottom
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll on next/prev
    swipeToSlide: true, // Allow dragging to slide
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick} // Ensure this onClick is passed to enable navigation
      />
    );
  }

  function SamplePrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick} // Ensure this onClick is passed to enable navigation
      />
    );
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridRow}>
        <div
          className={classNames(styles.sliderContainer, styles.sliderWrapper)}
        >
          <Slider {...settings}>
            {headItems.map((item, index) => (
              <div key={index} className={styles.slideItemWrapper}>
                {item}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className={styles.gridRow}>
        <div
          className={classNames(styles.sliderContainer, styles.sliderWrapper)}
        >
          <Slider {...settings}>
            {bodyItems.map((item, index) => (
              <div key={index} className={styles.slideItemWrapper}>
                {item}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className={styles.gridRow}>
        <div
          className={classNames(styles.sliderContainer, styles.sliderWrapper)}
        >
          <Slider {...settings}>
            {legItems.map((item, index) => (
              <div key={index} className={styles.slideItemWrapper}>
                {item}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Dresser;
