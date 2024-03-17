import { LayoutGroup } from "framer-motion";
import Avatar from "../Avatar";
import Dresser from "../Dresser";
import WardrobeContainer from "../WardrobeContainer";
import styles from "./wardrobe.module.scss";

function Wardrobe() {
  return (
    <LayoutGroup>
      <main className={styles.main}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <div className={styles.dresser}>
          <Dresser />
        </div>
        <div className={styles.wardrobeContainer}>
          <WardrobeContainer />
        </div>
      </main>
    </LayoutGroup>
  );
}

export default Wardrobe;
