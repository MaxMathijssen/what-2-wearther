import { useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/legacy/image";
import styles from "./dresser.module.scss";
import { CustomArrowProps } from "react-slick";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import { Status, BodyPart, WardrobeItems } from "@/typings/types";
import classNames from "classnames";

function Dresser() {
  const [selectedSlide, setSelectedSlide] = useState<null | number>(null);
  const { wardrobeItems, setWardrobeItems } = useContext(WardrobeContext);

  const headImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Dresser &&
        wardrobeItem.bodyPart === BodyPart.Head
    )
    .map((headItem, index) => (
      <div
        key={index}
        className={styles.slideItemWrapper}
        onClick={() => handleSlideClick(index)}
      >
        <Image
          src={headItem.image.src}
          width={headItem.image.width}
          height={headItem.image.height}
          alt={headItem.image.alt}
        />
        {selectedSlide === index && (
          <div className={styles.selectedIndicator}></div>
        )}
      </div>
    ));

  const bodyImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Dresser &&
        wardrobeItem.bodyPart === BodyPart.Body
    )
    .map((bodyItem, index) => (
      <div key={index} className={styles.slideItemWrapper}>
        <Image
          src={bodyItem.image.src}
          width={bodyItem.image.width}
          height={bodyItem.image.height}
          alt={bodyItem.image.alt}
        />
      </div>
    ));

  const legsImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Dresser &&
        wardrobeItem.bodyPart === BodyPart.Legs
    )
    .map((legsItem, index) => (
      <div key={index} className={styles.slideItemWrapper}>
        <Image
          src={legsItem.image.src}
          width={legsItem.image.width}
          height={legsItem.image.height}
          alt={legsItem.image.alt}
        />
      </div>
    ));

  const handleSlideClick = (index: number | null) => {
    setSelectedSlide(index);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "0px",
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
                <Slider {...settings}>{headImages}</Slider>
              </div>
            </div>
            <div className={styles.gridRow}>
              <div
                className={classNames(
                  styles.sliderContainer,
                  styles.sliderWrapper
                )}
              >
                <Slider {...settings}>{bodyImages}</Slider>
              </div>
            </div>
            <div className={styles.gridRow}>
              <div
                className={classNames(
                  styles.sliderContainer,
                  styles.sliderWrapper
                )}
              >
                <Slider {...settings}>{legsImages}</Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dresser;
