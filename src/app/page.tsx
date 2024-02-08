import LocationProvider from "@/components/LocationProvider";
import TemperatureProvider from "@/components/ForecastProvider";
import CardCarousel from "@/components/CardCarousel";

function HomePage() {
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

export default HomePage;
