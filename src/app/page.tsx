import Image from "next/image";
import styles from "./page.module.css";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <WeatherCard isPlaceHolder={false} />
    </main>
  );
}
