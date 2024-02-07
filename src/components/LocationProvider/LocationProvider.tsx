"use client";

import { useEffect, useState, createContext, PropsWithChildren } from "react";

type Location = {
  longitude: number;
  latitude: number;
};

export const LocationContext = createContext<Location | null>(null);

function LocationProvider({ children }: PropsWithChildren) {
  const [location, setLocation] = useState<Location | null>(() => {
    if (typeof window !== "undefined") {
      const storedLocation = window.localStorage.getItem("userLocation");

      if (storedLocation) {
        try {
          const parsedLocation = JSON.parse(storedLocation);

          if (
            parsedLocation &&
            typeof parsedLocation === "object" &&
            "latitude" in parsedLocation &&
            "longitude" in parsedLocation
          ) {
            console.log("Parsed location", parsedLocation);
            return parsedLocation;
          }
        } catch (error) {
          console.error("Error parsing stored location:", error);
        }
      }
      return null;
    }
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position: {
        coords: Location;
      }) {
        const newLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Check if the new location is different from the current location
        if (
          location === null ||
          (location.latitude !== newLocation.latitude &&
            location.longitude !== newLocation.longitude)
        ) {
          // Save the new location to localStorage
          localStorage.setItem("userLocation", JSON.stringify(newLocation));
          setLocation(newLocation);
          console.log("Set new location", newLocation);
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [location]);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
