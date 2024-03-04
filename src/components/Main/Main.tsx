"use client";

import { useContext } from "react";
import Forecast from "../Forecast";
import Wardrobe from "../Wardrobe";
import styles from "./main.module.scss";
import { WardrobeContext } from "@/providers/WardrobeProvider";

function Main() {
  const { wardrobeEnabled } = useContext(WardrobeContext);

  return (
    <>
      {!wardrobeEnabled && <Forecast />}
      {wardrobeEnabled && <Wardrobe />}
    </>
  );
}

export default Main;
