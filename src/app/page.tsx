import LocationProvider from "@/providers/LocationProvider";
import ForecastProvider from "@/providers/ForecastProvider";
import WardrobeProvider from "@/providers/WardrobeProvider";
import CurrentInformation from "@/components/CurrentInformation";
import Main from "@/components/Main";

function HomePage() {
  return (
    <LocationProvider>
      <ForecastProvider>
        <WardrobeProvider>
          <CurrentInformation />
          <Main />
        </WardrobeProvider>
      </ForecastProvider>
    </LocationProvider>
  );
}

export default HomePage;
