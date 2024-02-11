import LocationProvider from "@/app/providers/LocationProvider";
import ForecastProvider from "@/app/providers/ForecastProvider";
import WeeklyForecast from "@/components/WeekyForecast";
import DailyForecast from "@/components/DailyForecast";

function HomePage() {
  return (
    <LocationProvider>
      <ForecastProvider>
        <main className="main">
          <WeeklyForecast />
          <DailyForecast />
        </main>
      </ForecastProvider>
    </LocationProvider>
  );
}

export default HomePage;
