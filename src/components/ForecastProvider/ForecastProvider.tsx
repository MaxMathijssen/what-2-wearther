"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { API_KEY } from "@/helpers/constants";
import { LocationContext } from "../LocationProvider";
import { getDayNames, getCurrentTimestamp } from "@/helpers/utils";
import { DailyForecast } from "@/typings/types";
import useSWR from "swr";

export const ForecastContext = createContext<number | any | boolean | null>(
  null
);

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function ForecastProvider({ children }: PropsWithChildren) {
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[] | null>(
    null
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(
    null
  );

  function selectDailyForecast(dailyForecast: DailyForecast) {
    setDailyForecast(dailyForecast);
  }

  useEffect(() => {
    const storedWeeklyForecast = window.localStorage.getItem("weeklyForecast");

    if (storedWeeklyForecast) {
      try {
        const parsedWeeklyForecast = JSON.parse(storedWeeklyForecast);

        if (
          parsedWeeklyForecast &&
          Array.isArray(parsedWeeklyForecast) &&
          parsedWeeklyForecast.every(
            (item) =>
              typeof item === "object" &&
              "day" in item &&
              "temp" in item &&
              "weather" in item
          )
        ) {
          console.log("Parsed weeklyForecast", parsedWeeklyForecast);
          setWeeklyForecast(parsedWeeklyForecast);
        }
      } catch (error) {
        console.error("Error parsing stored weekly forecast:", error);
      }
    }
  }, []);

  const location = useContext(LocationContext);

  let shouldFetch: boolean = false;
  if (
    (weeklyForecast === null && location !== null) ||
    (weeklyForecast !== null &&
      getCurrentTimestamp() - weeklyForecast[0].dt > 1800)
  ) {
    shouldFetch = true;
  }

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`;
  const { data, error, isLoading } = useSWR(shouldFetch ? url : null, fetcher, {
    refreshInterval: 900000,
    revalidateOnFocus: false,
  });

  console.log(data);

  const newWeeklyForecast: DailyForecast[] = [];

  const dayNames = getDayNames();

  const getIconPath = (icon: string): string => {
    console.log(icon);
    switch (icon) {
      case "01d":
        return "/01d@2x.png";
      case "01n":
        return "/01n@2x.png";
      case "02d":
        return "/02d@2x.png";
      case "02n":
        return "/02n@2x.png";
      case "03d":
        return "/03d@2x.png";
      case "03n":
        return "/03n@2x.png";
      case "04d":
        return "/04d@2x.png";
      case "04n":
        return "/04n@2x.png";
      case "09d":
        return "/09d@2x.png";
      case "09n":
        return "/09n@2x.png";
      case "10d":
        return "/10d@2x.png";
      case "10n":
        return "/10n@2x.png";
      case "11d":
        return "/11d@2x.png";
      case "11n":
        return "/11n@2x.png";
      case "13d":
        return "/13d@2x.png";
      case "13n":
        return "/13n@2x.png";
      case "50d":
        return "/50d@2x.png";
      case "50n":
        return "/50n@2x.png";
      default:
        return "error.png";
    }
  };

  function getBackgroundColor(id: string) {
    const opacity = "0.6";

    // Thunderstorm
    if (/^2/.test(id)) {
      return `rgba(70, 72, 79, ${opacity})`;
    }
    // Drizzle & Rain
    else if (/^3/.test(id) || /^5/.test(id)) {
      return `rgba(73, 152, 209, ${opacity})`;
    }
    // Snow
    else if (/^6/.test(id)) {
      return `rgba(235, 241, 245, ${opacity})`;
    }
    // Wind
    else if (/^7/.test(id)) {
      return `rgba(194, 200, 204, ${opacity})`;
    }
    // Sun
    else if (/^800$/.test(id)) {
      return `rgba(250, 199, 32, ${opacity})`;
    }
    // Clouds
    else if (/^80/.test(id)) {
      return `rgba(194, 200, 204, ${opacity})`;
    }
    // Default
    else {
      return `rgba(255, 255, 255, ${opacity})`;
    }
  }

  function convertDegreesToCardinalDirection(degrees: number) {
    const sectors = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    const index = Math.round(degrees / 45) % 8;
    return sectors[index];
  }

  if (data && location !== null) {
    for (let i = 0; i < 7; i++) {
      console.log(data);
      const dailyForecast: DailyForecast = {
        dt: data.daily[i].dt,
        day: dayNames[i],
        temp: {
          min: Math.round(data.daily[i].temp.min),
          max: Math.round(data.daily[i].temp.max),
          morn: Math.round(data.daily[i].temp.morn),
          day: Math.round(data.daily[i].temp.day),
          night: Math.round(data.daily[i].temp.night),
          eve: Math.round(data.daily[i].temp.eve),
        },
        humidity: Math.round(data.daily[i].humidity),
        feels_like: Math.round(data.daily[i].feels_like),
        weather: data.daily[i].weather[0].main,
        clouds: Math.round(data.daily[i].clouds),
        wind_speed: Math.round(data.daily[i].wind_speed * 3.6),
        wind_direction: convertDegreesToCardinalDirection(
          data.daily[i].wind_deg
        ),
        wind_gust: Math.round(data.daily[i].wind_gust),
        pop: Math.round(data.daily[i].pop),
        rain: Math.round(data.daily[i].rain),
        uvi: Math.round(data.daily[i].uvi),
        iconPath: getIconPath(data.daily[i].weather[0].icon),
        color: getBackgroundColor(data.daily[i].weather[0].id),
      };

      if (i === 0) {
        dailyForecast.day = "Today";
        dailyForecast.dt = Math.round(data.current.dt);
        dailyForecast.temp.current = Math.round(data.current.temp);
        dailyForecast.weather = data.current.weather[0].main;
        dailyForecast.feels_like = Math.round(data.current.feels_like);
        dailyForecast.humidity = Math.round(data.current.humidity);
        dailyForecast.clouds = Math.round(data.current.clouds);
        dailyForecast.wind_speed = Math.round(data.current.wind_speed * 3.6);
        dailyForecast.wind_direction = convertDegreesToCardinalDirection(
          data.current.wind_deg
        );
        dailyForecast.wind_gust = Math.round(data.current.wind_gust);
        dailyForecast.iconPath = getIconPath(data.current.weather[0].icon);
        dailyForecast.color = getBackgroundColor(data.current.weather[0].id);
      }
      newWeeklyForecast.push(dailyForecast);
    }

    if (newWeeklyForecast !== null) {
      console.log("Stored weeklyForecast", newWeeklyForecast);
      window.localStorage.setItem(
        "weeklyForecast",
        JSON.stringify(newWeeklyForecast)
      );
      setWeeklyForecast(newWeeklyForecast);
    }
  }

  if (isLoading) {
    console.log("SWR is fetching data...");
  }

  return (
    <ForecastContext.Provider
      value={{
        dailyForecast,
        weeklyForecast,
        selectDailyForecast,
        error,
        isLoading,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
}

export default ForecastProvider;
