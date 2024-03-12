import Image from "next/legacy/image";
import styles from "./avatar.module.scss";

function Avatar() {
  return (
    <div className={styles.avatarContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.body}>
          <div className={styles.topRow}>
            <Image
              src="/head_placeholder_bw.png"
              width={62}
              height={62}
              alt="Head bald"
              layout="fixed"
            />
          </div>
          <div className={styles.middleRow}>
            <Image
              src="/body_placeholder_bw.png"
              width={68}
              height={85}
              alt="Body t-shirt"
              layout="fixed"
            />
          </div>
          <div className={styles.bottomRow}>
            <Image
              src="/legs_placeholder_bw.png"
              width={50}
              height={100}
              alt="Legs suit"
              layout="fixed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
