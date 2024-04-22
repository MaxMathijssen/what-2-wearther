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
    const updatedItems = wardrobeItems.map((item) => {
      if (item.id === clickedWardrobeItem.id) {
        // Change the clicked item's status to Avatar and reset justMovedBack
        return { ...item, status: Status.Avatar, justMovedBack: false };
      } else if (
        item.status === Status.Avatar &&
        item.bodyPart === clickedWardrobeItem.bodyPart
      ) {
        // Revert any existing Avatar item of the same body part to Wardrobe and set justMovedBack
        return { ...item, status: Status.Wardrobe, justMovedBack: true };
      }
      return item;
    });

    setWardrobeItems(updatedItems);
  }

  // Helper function to generate item components based on body part
  const generateItemComponents = (bodyPart) =>
    wardrobeItems
      .filter(
        (item) => item.status === Status.Wardrobe && item.bodyPart === bodyPart
      )
      .map((item) => (
        <motion.div
          key={item.id}
          layoutId={`item-${item.id}`}
          className={classNames(styles.itemWrapper, {
            [styles.fadeInOnly]: !item.justMovedBack,
          })}
          onClick={() => moveToAvatar(item)}
        >
          <Image
            src={item.image.src}
            width={item.image.width}
            height={item.image.height}
            alt={item.image.alt}
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
          <div className={styles.topRow}>
            {generateItemComponents(BodyPart.Head)}
          </div>
          <div className={styles.middleRow}>
            {generateItemComponents(BodyPart.Body)}
          </div>
          <div className={styles.bottomRow}>
            {generateItemComponents(BodyPart.Legs)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WardrobeContainer;
