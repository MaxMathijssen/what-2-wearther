import { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import { Status, BodyPart, WardrobeItem } from "@/typings/types";
import styles from "./wardrobeContainer.module.scss";
import classNames from "classnames";

function WardrobeContainer() {
  const { wardrobeItems, setWardrobeItems } = useContext(WardrobeContext);

  const itemsInWardrobe = wardrobeItems.filter(
    (item) => item.status === Status.Wardrobe
  );

  function moveToAvatar(clickedWardrobeItem: WardrobeItem) {
    const updatedItems = wardrobeItems.map((item) => {
      if (item.id === clickedWardrobeItem.id) {
        return { ...item, status: Status.Avatar, justMovedBack: false };
      } else if (
        item.status === Status.Avatar &&
        item.bodyPart === clickedWardrobeItem.bodyPart
      ) {
        return { ...item, status: Status.Wardrobe, justMovedBack: true };
      }
      return item;
    });

    setWardrobeItems(updatedItems);
  }

  const generateItemComponents = (bodyPart: BodyPart) =>
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
          {itemsInWardrobe.length === 0 ? (
            <div className={classNames(styles.noDataContainer, styles.fadeIn)}>
              <h2>It sure looks empty in here..</h2>
              <Image
                src="/wallet.png"
                width={100}
                height={100}
                alt="No items"
              />
              <h3>
                Fill up your wardrobe with items from the dresser to get
                started!
              </h3>
            </div>
          ) : (
            <>
              <div className={styles.topRow}>
                {generateItemComponents(BodyPart.Head)}
              </div>
              <div className={styles.middleRow}>
                {generateItemComponents(BodyPart.Body)}
              </div>
              <div className={styles.bottomRow}>
                {generateItemComponents(BodyPart.Legs)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WardrobeContainer;
