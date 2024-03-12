import React from "react";
import styles from "./wardrobeContainer.module.scss";

function WardrobeContainer() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Wardrobe</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.topRow}></div>
          <div className={styles.middleRow}></div>
          <div className={styles.bottomRow}></div>
        </div>
      </div>
    </div>
  );
}

export default WardrobeContainer;
