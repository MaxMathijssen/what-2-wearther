import { useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./Dresser.module.scss";
import { CustomArrowProps } from "react-slick";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import { Status, BodyPart, WardrobeItem } from "@/typings/types";
import classNames from "classnames";

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  swipeToSlide: boolean;
  centerMode: boolean;
  centerPadding: string;
  nextArrow: React.ReactElement | undefined;
  prevArrow: React.ReactElement | undefined;
}

interface SliderSettingsMap {
  head: SliderSettings;
  body: SliderSettings;
  legs: SliderSettings;
}

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
      <Image src={"/left-arrow.png"} width={30} height={30} alt={"Previous"} />
    </div>
  );
}

function Dresser() {
  const { wardrobeItems, setWardrobeItems } = useContext(WardrobeContext);
  const [sliderSettings, setSliderSettings] = useState<SliderSettingsMap>({
    head: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      centerMode: true,
      centerPadding: "0px",
      nextArrow: <NextArrow onClick={() => {}} />,
      prevArrow: <PrevArrow onClick={() => {}} />,
    },
    body: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      centerMode: true,
      centerPadding: "0px",
      nextArrow: <NextArrow onClick={() => {}} />,
      prevArrow: <PrevArrow onClick={() => {}} />,
    },
    legs: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      centerMode: true,
      centerPadding: "0px",
      nextArrow: <NextArrow onClick={() => {}} />,
      prevArrow: <PrevArrow onClick={() => {}} />,
    },
  });

  const dresserItems = wardrobeItems.filter(
    (wardrobeItem) => wardrobeItem.status === Status.Dresser
  );

  function updateSliderSettings(
    type: keyof SliderSettingsMap,
    newSettings: Partial<SliderSettings>
  ) {
    setSliderSettings((prevSettings) => ({
      ...prevSettings,
      [type]: { ...prevSettings[type], ...newSettings },
    }));
  }

  const headImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Dresser &&
        wardrobeItem.bodyPart === BodyPart.Head
    )
    .map((headItem) => (
      <div
        key={headItem.id}
        className={styles.slideItemWrapper}
        onClick={() => moveToWardrobe(headItem)}
      >
        <Image
          src={headItem.image.src}
          width={headItem.image.width}
          height={headItem.image.height}
          alt={headItem.image.alt}
        />
      </div>
    ));

  const bodyImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Dresser &&
        wardrobeItem.bodyPart === BodyPart.Body
    )
    .map((bodyItem) => (
      <div
        key={bodyItem.id}
        className={styles.slideItemWrapper}
        onClick={() => moveToWardrobe(bodyItem)}
      >
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
    .map((legsItem) => (
      <div
        key={legsItem.id}
        className={styles.slideItemWrapper}
        onClick={() => moveToWardrobe(legsItem)}
      >
        <Image
          src={legsItem.image.src}
          width={legsItem.image.width}
          height={legsItem.image.height}
          alt={legsItem.image.alt}
        />
      </div>
    ));

  function moveToWardrobe(clickedWardrobeItem: WardrobeItem) {
    const updatedClickedWardrobeItem = {
      ...clickedWardrobeItem,
      status: Status.Wardrobe,
    };

    const nextWardrobeItems = wardrobeItems
      .filter((item) => item.id !== clickedWardrobeItem.id)
      .concat(updatedClickedWardrobeItem);

    const newLength = nextWardrobeItems.filter(
      (item) =>
        item.bodyPart === clickedWardrobeItem.bodyPart &&
        item.status === Status.Dresser
    ).length;

    console.log(newLength);

    let bodyPartToUpdate: keyof SliderSettingsMap | null = null;
    switch (clickedWardrobeItem.bodyPart) {
      case BodyPart.Head:
        bodyPartToUpdate = "head";
        break;
      case BodyPart.Body:
        bodyPartToUpdate = "body";
        break;
      case BodyPart.Legs:
        bodyPartToUpdate = "legs";
        break;
      default:
        bodyPartToUpdate = null;
    }

    if (bodyPartToUpdate) {
      if (newLength === 2) {
        updateSliderSettings(bodyPartToUpdate, {
          slidesToShow: newLength,
          swipeToSlide: false,
          slidesToScroll: 0,
          nextArrow: undefined,
          prevArrow: undefined,
        });
      }
      if (newLength === 1) {
        updateSliderSettings(bodyPartToUpdate, {
          slidesToShow: 1,
          infinite: false,
          swipeToSlide: false,
          centerMode: false,
          slidesToScroll: 0,
          nextArrow: undefined,
          prevArrow: undefined,
        });
      }
    }

    setWardrobeItems(nextWardrobeItems);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1>Dresser</h1>
      </div>
      <div className={styles.body}>
        {dresserItems.length === 0 ? (
          <div className={classNames(styles.noDataContainer, styles.fadeIn)}>
            <h2>It sure looks empty in here..</h2>
            <Image src="/wallet.png" width={100} height={100} alt="No items" />
            <h3>Looks like you're all out of clothes!</h3>
          </div>
        ) : (
          <div className={styles.gridContainer}>
            <div className={styles.rightColumnContainer}>
              <div className={styles.gridRow}>
                <div
                  className={classNames(
                    styles.sliderContainer,
                    styles.sliderWrapper
                  )}
                >
                  <Slider {...sliderSettings.head}>{headImages}</Slider>
                </div>
              </div>
              <div className={styles.gridRow}>
                <div
                  className={classNames(
                    styles.sliderContainer,
                    styles.sliderWrapper
                  )}
                >
                  <Slider {...sliderSettings.body}>{bodyImages}</Slider>
                </div>
              </div>
              <div className={styles.gridRow}>
                <div
                  className={classNames(
                    styles.sliderContainer,
                    styles.sliderWrapper
                  )}
                >
                  <Slider {...sliderSettings.legs}>{legsImages}</Slider>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dresser;
