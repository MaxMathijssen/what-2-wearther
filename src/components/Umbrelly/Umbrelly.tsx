"use client";

import { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import styles from "./Umbrelly.module.scss";
import Image from "next/image";
import { WardrobeContext } from "@/providers/WardrobeProvider";

function Umbrelly() {
  const { avatar } = useContext(WardrobeContext);
  const [isShown, setIsShown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (avatar?.isComplete) {
      setIsShown(false);
      return;
    }

    if (wrapperRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        const [entry] = entries;
        setIsShown(entry.isIntersecting);
      });

      observerRef.current.observe(wrapperRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [avatar?.isComplete]);

  function handleClose() {
    setIsShown(false);

    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }

  const translateX = isShown ? "150%" : "400%";

  return (
    <>
      <div ref={wrapperRef} className={styles.wrapper}>
        <motion.div
          className={styles.character}
          transition={{
            type: "spring",
            stiffness: isShown ? 300 : 600,
            damping: isShown ? 70 : 40,
            restDelta: 0.01,
          }}
          animate={{
            x: translateX,
          }}
        >
          <div className={styles.speechBubble}>
            <button className={styles.closeButton} onClick={handleClose}>
              <Image src="/close.png" alt="Close" width={24} height={24} />
            </button>
            <p>
              <strong>Howdy! Umbrelly here!</strong>
              <br />
              <br />I couldn't help but notice you haven't filled up your
              wardrobe yet. How about you flip the toggle up top and start
              getting dressed for the weather up ahead?
            </p>
          </div>
          <Image src="/umbrelly.png" width={250} height={250} alt="Umbrelly" />
        </motion.div>
      </div>
    </>
  );
}

export default Umbrelly;
