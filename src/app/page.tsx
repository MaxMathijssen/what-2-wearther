import LocationProvider from "@/providers/LocationProvider";
import ForecastProvider from "@/providers/ForecastProvider";
import WeeklyForecast from "@/components/WeekyForecast";
import DailyForecast from "@/components/DailyForecast";
import CurrentInformation from "@/components/CurrentInformation";
import Umbrelly from "@/components/Umbrelly";

function HomePage() {
  return (
    <LocationProvider>
      <ForecastProvider>
        <CurrentInformation />
        <main className="main">
          <WeeklyForecast />
          <DailyForecast />
        </main>
        <Umbrelly />
      </ForecastProvider>
    </LocationProvider>
  );
}

export default HomePage;
