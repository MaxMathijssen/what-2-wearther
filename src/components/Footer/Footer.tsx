import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";

import styles from "./footer.module.scss";

function Footer() {
  return (
    <header className={styles.siteFooter}>
      <div className={styles.logoWrapper}>
        <Image
          src="/logo.svg"
          width={225}
          height={121}
          alt="Picture of the author"
          className={styles.mainLogo}
        />
        <p className={styles.disclaimer}>
          Copyright © 2024 What2Weather Inc. All Rights Reserved.
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
