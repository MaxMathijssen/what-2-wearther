import React from "react";
import Link from "next/link";

import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.siteHeader}>
      <Link href="" className={styles.logo}>
        What2Wearther
      </Link>
      <nav>
        <ol className={styles.headerNavLinks}></ol>
      </nav>
    </header>
  );
}

export default Header;
