"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  PropsWithChildren,
} from "react";
import { LocationContext } from "../LocationProvider";
import {
  getDayNames,
  getCurrentTimestamp,
  getEndOfDayTimestamp,
  convertTimestampToHour,
  convertTimestampToHourAmPm,
  convertEpochToTime,
} from "@/helpers/utils";
import { API_KEY, REFRESH_TIME_MIN, SECTORS } from "@/helpers/constants";
import { DailyForecast, HourlyForecast } from "@/typings/types";
import useSWR from "swr";

export const ForecastContext = createContext<number | any | boolean | null>(
  null
);

type Location = {
  city: string;
  country: string;
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function ForecastProvider({ children }: PropsWithChildren) {
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[] | null>(
    null
  );
  const [selectedDailyForecast, setSelectedDailyForecast] =
    useState<DailyForecast | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  function selectDailyForecast(dailyForecast: DailyForecast) {
    setSelectedDailyForecast(dailyForecast);
  }
  const prevLocation = useRef<Location | null>(null);
  const { coordinates, updateSource, location } = useContext(LocationContext);

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
          setSelectedDailyForecast(parsedWeeklyForecast[0]);
        }
      } catch (error) {
        console.error("Error parsing stored weekly forecast:", error);
      }
    }
  }, []);

  console.log(prevLocation, location);

  let shouldFetch: boolean = false;
  if (
    (prevLocation.current !== null &&
      location !== null &&
      prevLocation.current.city !== location.city) ||
    (updateSource === "auto" &&
      weeklyForecast === null &&
      coordinates !== null) ||
    (updateSource === "auto" &&
      weeklyForecast !== null &&
      getCurrentTimestamp() - weeklyForecast[0].dt > REFRESH_TIME_MIN * 60)
  ) {
    shouldFetch = true;
    prevLocation.current = null;
  }

  if (updateSource === "user" && searched) {
    shouldFetch = true;
  }

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`;
  const { data, error, isLoading } = useSWR(shouldFetch ? url : null, fetcher, {
    refreshInterval: REFRESH_TIME_MIN * 60 * 1000,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    console.log("Fetching weather forecast data");
  }

  const newWeeklyForecast: DailyForecast[] = [];
  const dayNames = getDayNames();

  const getIconPath = (icon: string): string => {
    switch (icon) {
      case "01d":
        return "/01d@2x.webp";
      case "01n":
        return "/01n@2x.webp";
      case "02d":
        return "/02d@2x.webp";
      case "02n":
        return "/02n@2x.webp";
      case "03d":
        return "/03d@2x.webp";
      case "03n":
        return "/03n@2x.webp";
      case "04d":
        return "/04d@2x.webp";
      case "04n":
        return "/04n@2x.webp";
      case "09d":
        return "/09d@2x.webp";
      case "09n":
        return "/09n@2x.webp";
      case "10d":
        return "/10d@2x.webp";
      case "10n":
        return "/10n@2x.webp";
      case "11d":
        return "/11d@2x.webp";
      case "11n":
        return "/11n@2x.webp";
      case "13d":
        return "/13d@2x.webp";
      case "13n":
        return "/13n@2x.webp";
      case "50d":
        return "/50d@2x.webp";
      case "50n":
        return "/50n@2x.webp";
      default:
        return "error.webp";
    }
  };

  function getBackgroundColor(id: string) {
    const opacity = "0.6";

    // Thunderstorm
    if (/^2/.test(id)) {
      return `rgba(70, 72, 79, ${opacity}`;
    }
    // Drizzle & Rain
    else if (/^3/.test(id) || /^5/.test(id)) {
      return `rgba(23,51,168, ${opacity})`;
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
      return `rgba(2, 204, 254, ${opacity})`;
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

  function convertDegreesToDirection(degrees: number) {
    const index = Math.round(degrees / 45) % 8;
    return SECTORS[index];
  }

  let hourIndex = 0;
  let startIndex = 0;
  let endIndex = 0;

  function getHourlyForecastArray(data: any, dayNum: number) {
    const hourlyForecastArray: HourlyForecast[] | [null] = [];

    startIndex = hourIndex;

    if (
      dayNum === 0 &&
      data.hourly[hourIndex + 1].dt <= getCurrentTimestamp()
    ) {
      hourIndex = 1;
    }

    if (dayNum === 0) {
      while (data.hourly[endIndex + startIndex].dt < getEndOfDayTimestamp()) {
        endIndex++;
      }
    } else {
      endIndex = hourIndex + 24 <= 48 ? hourIndex + 24 : 48;
    }

    for (let j = startIndex; j < endIndex; j++) {
      const hourlyForecast: HourlyForecast = {
        hour_index: j,
        dt: data.hourly[j].dt,
        hour: convertTimestampToHourAmPm(data.hourly[j].dt),
        hour_num: convertTimestampToHour(data.hourly[j].dt),
        temp: data.hourly[j].temp,
        feels_like: data.hourly[j].feels_like,
        weather: data.hourly[j].weather,
        iconPath: getIconPath(data.hourly[j].weather[0].icon),
      };
      hourIndex++;
      hourlyForecastArray.push(hourlyForecast);
    }
    return hourlyForecastArray;
  }

  if (data && coordinates !== null) {
    setSearched(false);
    for (let i = 0; i < 7; i++) {
      const dailyForecast: DailyForecast = {
        dt: data.daily[i].dt,
        day: dayNames[i],
        day_num: i,
        temp: {
          min: Math.round(data.daily[i].temp.min),
          max: Math.round(data.daily[i].temp.max),
          morn: Math.round(data.daily[i].temp.morn),
          day: Math.round(data.daily[i].temp.day),
          night: Math.round(data.daily[i].temp.night),
          eve: Math.round(data.daily[i].temp.eve),
        },
        humidity: data.daily[i].humidity,
        feels_like: {
          day: Math.round(data.daily[i].feels_like.day),
          night: Math.round(data.daily[i].feels_like.night),
          eve: Math.round(data.daily[i].feels_like.eve),
          morn: Math.round(data.daily[i].feels_like.morn),
        },
        hourly_forecast: getHourlyForecastArray(data, i),
        sunrise: convertEpochToTime(data.daily[i].sunrise),
        sunset: convertEpochToTime(data.daily[i].sunset),
        weather: data.daily[i].weather[0].main,
        clouds: Math.round(data.daily[i].clouds),
        wind_speed: Math.round(data.daily[i].wind_speed * 3.6),
        wind_direction: convertDegreesToDirection(data.daily[i].wind_deg),
        wind_gust: Math.round(data.daily[i].wind_gust * 3.6),
        pop: Math.round(data.daily[i].pop * 100),
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
        dailyForecast.feels_like.current = Math.round(data.current.feels_like);
        dailyForecast.humidity = data.current.humidity;
        dailyForecast.clouds = Math.round(data.current.clouds);
        dailyForecast.wind_speed = Math.round(data.current.wind_speed * 3.6);
        dailyForecast.wind_direction = convertDegreesToDirection(
          data.current.wind_deg
        );
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
      setSelectedDailyForecast(newWeeklyForecast[0]);
    }

    if (
      newWeeklyForecast !== null &&
      JSON.stringify(newWeeklyForecast) !== JSON.stringify(weeklyForecast)
    ) {
      console.log("Updating forecast data");
      setWeeklyForecast(newWeeklyForecast);
      setSelectedDailyForecast(newWeeklyForecast[0]);
      window.localStorage.removeItem("weeklyForecast");
      window.localStorage.setItem(
        "weeklyForecast",
        JSON.stringify(newWeeklyForecast)
      );
    }
  }

  const contextValue = useMemo(
    () => ({
      selectedDailyForecast,
      weeklyForecast,
      selectDailyForecast,
      error,
      isLoading,
      setSearched,
      prevLocation,
    }),
    [selectedDailyForecast, weeklyForecast, error, isLoading]
  );

  return (
    <ForecastContext.Provider value={contextValue}>
      {children}
    </ForecastContext.Provider>
  );
}

export default ForecastProvider;
