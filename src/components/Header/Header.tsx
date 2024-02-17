import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";

import styles from "./header.module.css";

function Header() {
  // Generate an array with 20 elements (5 existing + 15 new)
  const bubbles = Array.from(
    { length: 200 },
    (_, index) => `bubble${index + 1}`
  );

  console.log("Header render");

  return (
    <header className={styles.siteHeader}>
      <Link href="/"></Link>
      <div className={styles.circle1}></div>
      {bubbles.map((_, index) => (
        <div
          key={index}
          className={styles.bubble}
          style={{
            left: `${Math.random() * 100}%`, // Random horizontal start
            animationDuration: `${8 + Math.random() * 12}s`, // Slightly longer duration for smoothness
            width: `${4 + Math.random() * 8}px`, // Bubble size between 4px and 12px, ensuring roundness
            height: `${4 + Math.random() * 8}px`, // Equal to width to maintain circular shape
            animationDelay: `-${Math.random() * 8}s`, // Staggered start for a continuous flow
            bottom: `${-10 + Math.random() * 20}%`, // Adjusted starting point within the header
            animationTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)", // Custom Bezier for smoothness
          }}
        ></div>
      ))}
      <Image
        src="/Logo.svg"
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
