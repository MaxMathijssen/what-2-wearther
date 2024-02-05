import LocationProvider from "@/components/LocationProvider";
import TemperatureProvider from "@/components/TemperatureProvider";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  return (
    <LocationProvider>
      <TemperatureProvider>
        <main className="main">
          <WeatherCard isPlaceHolder={false} />
        </main>
      </TemperatureProvider>
    </LocationProvider>
  );
}
