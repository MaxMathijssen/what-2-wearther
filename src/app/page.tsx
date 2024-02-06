import LocationProvider from "@/components/LocationProvider";
import TemperatureProvider from "@/components/ForecastProvider";
import CardCarousel from "@/components/CardCarousel";

export default function Home() {
  return (
    <LocationProvider>
      <TemperatureProvider>
        <main className="main">
          <CardCarousel />
        </main>
      </TemperatureProvider>
    </LocationProvider>
  );
}
