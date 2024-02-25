"use client";

import {
  useEffect,
  useState,
  createContext,
  useMemo,
  useRef,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from "react";
import { API_KEY } from "@/helpers/constants";

type Coordinates = {
  longitude: number;
  latitude: number;
};

type Location = {
  city: string;
  country: string;
};

type LocationContextType = {
  coordinates: Coordinates | null;
  location: Location | null;
  setCoordinates: (
    coordinates: Coordinates | null,
    source: "user" | "auto"
  ) => void;
  updateSource: string | null;
};

export const LocationContext = createContext<LocationContextType>({
  coordinates: null,
  setCoordinates: () => {},
  location: null,
  updateSource: null,
});

function LocationProvider({ children }: PropsWithChildren<{}>) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [updateSource, setUpdateSource] = useState<"user" | "auto">("auto");
  const prevCoordinatesRef = useRef<Coordinates | null>(null);

  const setCoordinatesWithSource = (
    coordinates: Coordinates | null,
    source: "user" | "auto" = "auto"
  ) => {
    setCoordinates(coordinates);
    setUpdateSource(source);
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!coordinates || updateSource !== "auto") return;

      const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&limit=1&appid=${API_KEY}`;
      const data = await fetcher(url);
      setLocation({
        city: data[0].name,
        country: data[0].country,
      });
    };

    if (
      !prevCoordinatesRef.current ||
      prevCoordinatesRef.current.latitude !== coordinates?.latitude ||
      prevCoordinatesRef.current.longitude !== coordinates?.longitude
    ) {
      fetchLocationData();
      prevCoordinatesRef.current = coordinates;
    }
  }, [coordinates, updateSource]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setCoordinates({ latitude, longitude });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const value = useMemo(
    () => ({
      coordinates,
      setCoordinates: setCoordinatesWithSource,
      location,
      updateSource,
    }),
    [coordinates, location]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
