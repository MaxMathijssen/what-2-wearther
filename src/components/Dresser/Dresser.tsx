import { SetStateAction, useState } from "react";
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
  <Image src="/head_black.png" width={50} height={60} alt="Head black" />,
  <Image src="/head_beard.png" width={50} height={50} alt="Head beard" />,
  <Image src="/head_orange.png" width={50} height={55} alt="Head orange" />,
];
const bodyItems = [
  <Image src="/body_tanktop.png" width={50} height={68} alt="Body tanktop" />,
  <Image src="/body_hoodie.png" width={50} height={73} alt="Body hoodie" />,
  <Image src="/body_suit.png" width={50} height={67} alt="Body suit" />,
  <Image src="/body_tshirt.png" width={50} height={68} alt="Body t-shirt" />,
  <Image src="/body_jacket.png" width={50} height={67} alt="Body jacket" />,
  <Image src="/body_sweater.png" width={50} height={63} alt="Body sweater" />,
];
const legItems = [
  <Image src="/legs_yellow.png" width={40} height={80} alt="Legs yellow" />,
  <Image src="/legs_black.png" width={40} height={80} alt="Legs black" />,
  <Image src="/legs_shorts.png" width={40} height={80} alt="Legs shorts" />,
  <Image src="/legs_ripped.png" width={40} height={80} alt="Legs ripped" />,
  <Image src="/legs_suit.png" width={40} height={80} alt="Legs suit" />,
  <Image src="/legs_jeans.png" width={40} height={80} alt="Legs jeans" />,
];

function Dresser() {
  const [selectedSlide, setSelectedSlide] = useState<null | number>(null);

  const handleSlideClick = (index: number | null) => {
    setSelectedSlide(index);
  };

  const settings = {
    dots: false, // Show dot indicators at the bottom
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll on next/prev
    swipeToSlide: true, // Allow dragging to slide
    centerMode: true, // Enable center mode
    centerPadding: "0px", // Adjust padding as needed
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  function NextArrow(props: CustomArrowProps) {
    const { onClick } = props;

    return (
      <div className={styles.btnNext} onClick={onClick}>
        <Image src={"/right-arrow.png"} width={30} height={30} alt={"Next"} />
      </div>
    );
  }

  function PrevArrow(props: CustomArrowProps) {
    const { onClick } = props;

    return (
      <div className={styles.btnPrev} onClick={onClick}>
        <Image
          src={"/left-arrow.png"}
          width={30}
          height={30}
          alt={"Previous"}
        />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1>Dresser</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.gridContainer}>
          <div className={styles.rightColumnContainer}>
            <div className={styles.gridRow}>
              <div
                className={classNames(
                  styles.sliderContainer,
                  styles.sliderWrapper
                )}
              >
                <Slider {...settings}>
                  {headItems.map((item, index) => (
                    <div
                      key={index}
                      className={styles.slideItemWrapper}
                      onClick={() => handleSlideClick(index)}
                    >
                      {item}
                      {selectedSlide === index && (
                        <div className={styles.selectedIndicator}></div>
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className={styles.gridRow}>
              <div
                className={classNames(
                  styles.sliderContainer,
                  styles.sliderWrapper
                )}
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
                className={classNames(
                  styles.sliderContainer,
                  styles.sliderWrapper
                )}
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
        </div>
      </div>
    </div>
  );
}

export default Dresser;
