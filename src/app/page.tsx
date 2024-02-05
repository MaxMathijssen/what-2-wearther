import Image from "next/image";
import styles from "./page.module.css";
import LocationProvider from "@/components/LocationProvider";
import TemperatureProvider from "@/components/TemperatureProvider";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  return (
    <LocationProvider>
      <TemperatureProvider>
        <main className={styles.main}>
          <WeatherCard isPlaceHolder={false} />
        </main>
      </TemperatureProvider>
    </LocationProvider>
  );
}
