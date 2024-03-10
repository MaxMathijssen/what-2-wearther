import React from "react";
import Image from "next/legacy/image";
import styles from "./dresser.module.scss";

const headSize = { width: 45, height: 50 };

function Dresser() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridRow}>
        <div className={styles.gridItem}>1</div>
        <div className={styles.gridItem}>
          <Image src="/head_bald.png" width={50} height={50} alt="Head bald" />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/head_ginger.png"
            width={49}
            height={50}
            alt="Head ginger"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/head_blonde.png"
            width={50}
            height={50}
            alt="Head blonde"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/head_black.png"
            width={50}
            height={66}
            alt="Head black"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/head_beard.png"
            width={50}
            height={55}
            alt="Head beard"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/head_orange.png"
            width={50}
            height={62}
            alt="Head orange"
          />
        </div>
      </div>
      <div className={styles.gridRow}>
        <div className={styles.gridItem}>8</div>
        <div className={styles.gridItem}>
          <Image
            src="/body_tanktop.png"
            width={50}
            height={71}
            alt="Body tanktop"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/body_hoodie.png"
            width={50}
            height={76}
            alt="Body hoodie"
          />
        </div>
        <div className={styles.gridItem}>
          <Image src="/body_suit.png" width={50} height={70} alt="Body suit" />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/body_tshirt.png"
            width={50}
            height={71}
            alt="Body t-shirt"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/body_jacket.png"
            width={50}
            height={70}
            alt="Body jacket"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/body_sweater.png"
            width={50}
            height={67}
            alt="Body sweater"
          />
        </div>
      </div>
      <div className={styles.gridRow}>
        <div className={styles.gridItem}>15</div>
        <div className={styles.gridItem}>
          <Image
            src="/legs_yellow.png"
            width={50}
            height={90}
            alt="Legs yellow"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/legs_black.png"
            width={50}
            height={90}
            alt="Legs black"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/legs_shorts.png"
            width={50}
            height={90}
            alt="Legs shorts"
          />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/legs_ripped.png"
            width={50}
            height={90}
            alt="Legs ripped"
          />
        </div>
        <div className={styles.gridItem}>
          <Image src="/legs_suit.png" width={50} height={90} alt="Legs suit" />
        </div>
        <div className={styles.gridItem}>
          <Image
            src="/legs_jeans.png"
            width={50}
            height={90}
            alt="Legs jeans"
          />
        </div>
      </div>
    </div>
  );
}

export default Dresser;
