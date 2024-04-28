import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";

import styles from "./Header.module.scss";

function Header() {
  const bubbles = Array.from(
    { length: 200 },
    (_, index) => `bubble${index + 1}`
  );

  return (
    <header className={styles.siteHeader}>
      <Link href="/"></Link>
      <div className={styles.circle1}></div>
      {bubbles.map((_, index) => (
        <div
          key={index}
          className={styles.bubble}
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            animationDelay: `-${Math.random() * 8}s`,
            bottom: `${-10 + Math.random() * 20}%`,
            animationTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        ></div>
      ))}
      <Image
        src="/logo.svg"
        width={450}
        height={242}
        alt="Picture of the author"
        className={styles.mainLogo}
        priority={true}
      />
    </header>
  );
}

export default Header;
