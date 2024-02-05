"use client";

import { useEffect, useState, createContext, PropsWithChildren } from "react";

type Location = {
  longitude: number;
  latitude: number;
};

export const LocationContext = createContext<Location | null>(null);

function LocationProvider({ children }: PropsWithChildren) {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position: {
        coords: Location;
      }) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
