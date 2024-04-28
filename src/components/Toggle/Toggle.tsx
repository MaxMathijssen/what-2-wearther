import React from "react";
import { motion } from "framer-motion";

import styles from "./Toggle.module.scss";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ value, onChange, ...delegated }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      className={styles.wrapper}
      onClick={() => onChange(!value)}
      style={{
        justifyContent: value ? "flex-end" : "flex-start",
      }}
      {...delegated}
    >
      <motion.span
        className={styles.ball}
        layout={true}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 40,
        }}
      />
    </button>
  );
}

export default Toggle;
