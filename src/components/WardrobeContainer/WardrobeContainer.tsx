import { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import { Status, BodyPart, WardrobeItem } from "@/typings/types";
import styles from "./wardrobeContainer.module.scss";
import classNames from "classnames";

function WardrobeContainer() {
  const { wardrobeItems, setWardrobeItems } = useContext(WardrobeContext);

  function moveToAvatar(clickedWardrobeItem: WardrobeItem) {
    const updatedClickedWardrobeItem = {
      ...clickedWardrobeItem,
      status: Status.Avatar,
    };

    const nextWardrobeItems = wardrobeItems
      .filter((item) => item.id !== clickedWardrobeItem.id)
      .concat(updatedClickedWardrobeItem);

    setWardrobeItems(nextWardrobeItems);
  }

  const headImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Wardrobe &&
        wardrobeItem.bodyPart === BodyPart.Head
    )
    .map((headItem) => (
      <motion.div
        key={headItem.id}
        layoutId={`item-${headItem.id}`}
        className={classNames(styles.itemWrapper, styles.fadeInOnly)}
        onClick={() => moveToAvatar(headItem)}
      >
        <Image
          src={headItem.image.src}
          width={headItem.image.width}
          height={headItem.image.height}
          alt={headItem.image.alt}
        />
      </motion.div>
    ));

  const bodyImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Wardrobe &&
        wardrobeItem.bodyPart === BodyPart.Body
    )
    .map((bodyItem) => (
      <motion.div
        key={bodyItem.id}
        layoutId={`item-${bodyItem.id}`}
        className={classNames(styles.itemWrapper, styles.fadeInOnly)}
        onClick={() => moveToAvatar(bodyItem)}
      >
        <Image
          src={bodyItem.image.src}
          width={bodyItem.image.width}
          height={bodyItem.image.height}
          alt={bodyItem.image.alt}
        />
      </motion.div>
    ));

  const legsImages = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Wardrobe &&
        wardrobeItem.bodyPart === BodyPart.Legs
    )
    .map((legsItem) => (
      <motion.div
        key={legsItem.id}
        layoutId={`item-${legsItem.id}`}
        className={classNames(styles.itemWrapper, styles.fadeInOnly)}
        onClick={() => moveToAvatar(legsItem)}
      >
        <Image
          src={legsItem.image.src}
          width={legsItem.image.width}
          height={legsItem.image.height}
          alt={legsItem.image.alt}
        />
      </motion.div>
    ));

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Wardrobe</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.topRow}>{headImages}</div>
          <div className={styles.middleRow}>{bodyImages}</div>
          <div className={styles.bottomRow}>{legsImages}</div>
        </div>
      </div>
    </div>
  );
}

export default WardrobeContainer;
