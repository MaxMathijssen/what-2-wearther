import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.siteHeader}>
      <Link href="/">
        <div className={styles.imageContainer}>
          <Image
            src="/What2Wearther.jpg"
            width={100}
            height={100}
            alt="Picture of the author"
            className={styles.logo}
          />
        </div>
      </Link>
      <h1 className={styles.siteTitle}>What 2 Wearther</h1>
    </header>
  );
}

export default Header;
