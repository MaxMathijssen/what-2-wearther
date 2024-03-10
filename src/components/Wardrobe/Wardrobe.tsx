import Avatar from "../Avatar";
import Dresser from "../Dresser";
import styles from "./wardrobe.module.scss";

function Wardrobe() {
  return (
    <main className={styles.main}>
      <Avatar />
      <Dresser />
    </main>
  );
}

export default Wardrobe;
