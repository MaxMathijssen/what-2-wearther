import Image from "next/image";
import styles from "./page.module.css";
import LocationProvider from "@/components/LocationProvider";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  return (
    <LocationProvider>
      <main className={styles.main}>
        <WeatherCard isPlaceHolder={false} />
      </main>
    </LocationProvider>
  );
}
