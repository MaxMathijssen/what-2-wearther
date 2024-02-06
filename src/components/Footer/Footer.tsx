import React from "react";
import Link from "next/link";

import styles from "./footer.module.css";

function Footer() {
  return (
    <header className={styles.siteFooter}>
      <div className={styles.logoWrapper}>
        <Link href="" className={styles.logo}>
          What2Wearther
        </Link>
        <p className={styles.disclaimer}>
          Copyright © 2099 What2Wearther Inc. All Rights Reserved.
        </p>
      </div>

      <div className={styles.linkWrapper}>
        <div className="col"></div>
        <div className="col">
          <h2>Legal</h2>
          <nav>
            <ol>
              <li>
                <Link href="">Terms of Use</Link>
              </li>
              <li>
                <Link href="">Privacy Policy</Link>
              </li>
              <li>
                <Link href="">Contact</Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Footer;
