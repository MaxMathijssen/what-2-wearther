"use client";

import {
  useEffect,
  useState,
  createContext,
  useMemo,
  PropsWithChildren,
} from "react";
import useSWR from "swr";
import { API_KEY } from "@/helpers/constants";

type Coordinates = {
  longitude: number;
  latitude: number;
};

type Location = {
  city: number;
  country: number;
};

type LocationContextType = {
  coordinates: Coordinates | null;
};

export const LocationContext = createContext<LocationContextType>({
  coordinates: null,
});

function LocationProvider({ children }: PropsWithChildren) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position: {
        coords: Coordinates;
      }) {
        const newCoordinates: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const storedCoordinates =
          window.localStorage.getItem("userCoordinates");

        if (storedCoordinates) {
          return;
        }

        if (
          !coordinates ||
          (coordinates.latitude !== newCoordinates.latitude &&
            coordinates.longitude !== newCoordinates.longitude)
        ) {
          localStorage.setItem(
            "userCoordinates",
            JSON.stringify(newCoordinates)
          );
          setCoordinates(newCoordinates);
          console.log("Set coordinates", newCoordinates);
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [coordinates]);

  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&limit=1&appid=${API_KEY}`;
  const { data, error, isLoading } = useSWR(shouldFetch ? url : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) {
    console.log("Fetching weather forecast data");
  }

  if (data) {
    const location = data[0];

    const locationData: Location = {
      city: location.name,
      country: location.country,
    };

    setLocation(locationData);
  }

  console.log(url, location);

  const value = useMemo(() => ({ coordinates }), [coordinates]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
