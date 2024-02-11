import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Location = {
  longitude: number;
  latitude: number;
};

function useGetLocation(
  setLocation: Dispatch<SetStateAction<Location | null>>
) {
  useEffect(() => {
    console.log("Location render");
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
  }, [setLocation]);
  console.log("Page render render");
}

export default useGetLocation;
