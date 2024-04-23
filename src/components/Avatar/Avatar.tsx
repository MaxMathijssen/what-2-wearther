import Image from "next/legacy/image";
import styles from "./avatar.module.scss";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import { Status, BodyPart, WardrobeItem } from "@/typings/types";
import classNames from "classnames";

function Avatar() {
  const { wardrobeItems } = useContext(WardrobeContext);
  const [showAnimation, setShowAnimation] = useState(false);

  // Checks for each body part
  const hasHeadAvatar = wardrobeItems.some(
    (item) => item.status === Status.Avatar && item.bodyPart === BodyPart.Head
  );
  const hasBodyAvatar = wardrobeItems.some(
    (item) => item.status === Status.Avatar && item.bodyPart === BodyPart.Body
  );
  const hasLegsAvatar = wardrobeItems.some(
    (item) => item.status === Status.Avatar && item.bodyPart === BodyPart.Legs
  );

  const allReplaced = hasHeadAvatar && hasBodyAvatar && hasLegsAvatar;

  useEffect(() => {
    if (allReplaced) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000); // Animation duration and fading
      return () => clearTimeout(timer);
    }
  }, [allReplaced]);

  const headImage = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Avatar &&
        wardrobeItem.bodyPart === BodyPart.Head
    )
    .map((headItem) => (
      <motion.div
        key={headItem.id}
        layoutId={`item-${headItem.id}`}
        className={classNames(styles.itemWrapper, styles.fadeInOnly)}
      >
        <Image
          src={headItem.image.src}
          width={headItem.image.width * 1.3}
          height={headItem.image.height * 1.3}
          alt={headItem.image.alt}
        />
      </motion.div>
    ));

  const bodyImage = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Avatar &&
        wardrobeItem.bodyPart === BodyPart.Body
    )
    .map((bodyItem) => (
      <motion.div
        key={bodyItem.id}
        layoutId={`item-${bodyItem.id}`}
        className={classNames(styles.itemWrapper, styles.fadeInOnly)}
      >
        <Image
          src={bodyItem.image.src}
          width={bodyItem.image.width * 1.3}
          height={bodyItem.image.height * 1.3}
          alt={bodyItem.image.alt}
        />
      </motion.div>
    ));

  const legsImage = wardrobeItems
    .filter(
      (wardrobeItem) =>
        wardrobeItem.status === Status.Avatar &&
        wardrobeItem.bodyPart === BodyPart.Legs
    )
    .map((legsItem) => (
      <motion.div
        key={legsItem.id}
        layoutId={`item-${legsItem.id}`}
        className={classNames(styles.itemWrapper, styles.fadeInOnly)}
      >
        <Image
          src={legsItem.image.src}
          width={legsItem.image.width * 1.3}
          height={legsItem.image.height * 1.3}
          alt={legsItem.image.alt}
        />
      </motion.div>
    ));

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.body}>
          {showAnimation && <div className={styles.sunshineEffect}></div>}
          <div className={styles.topRow}>
            {headImage.length === 0 && (
              <Image
                src="/head_placeholder_bw.png"
                width={62}
                height={62}
                alt="Head bald"
                layout="fixed"
              />
            )}
            {headImage !== null && headImage.length > 0 && headImage}
          </div>
          <div className={styles.middleRow}>
            {bodyImage.length === 0 && (
              <Image
                src="/body_placeholder_bw.png"
                width={68}
                height={85}
                alt="Body t-shirt"
                layout="fixed"
              />
            )}
            {bodyImage !== null && bodyImage.length > 0 && bodyImage}
          </div>
          <div className={styles.bottomRow}>
            {legsImage.length === 0 && (
              <Image
                src="/legs_placeholder_bw.png"
                width={50}
                height={100}
                alt="Legs suit"
                layout="fixed"
              />
            )}
            {legsImage !== null && legsImage.length > 0 && legsImage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
