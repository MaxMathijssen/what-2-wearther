"use client";

import { createContext, useState, useMemo, PropsWithChildren } from "react";

type WardrobeContextType = {
  wardrobeEnabled: boolean;
  setWardrobeEnabled: (wardrobeEnabled: boolean) => void;
};

export const WardrobeContext = createContext<WardrobeContextType>({
  wardrobeEnabled: false,
  setWardrobeEnabled: () => {},
});

function WardrobeProvider({ children }: PropsWithChildren<{}>) {
  const [wardrobeEnabled, setWardrobeEnabled] = useState(false);

  const contextValue = useMemo(
    () => ({
      setWardrobeEnabled,
      wardrobeEnabled,
    }),
    [wardrobeEnabled]
  );

  return (
    <WardrobeContext.Provider value={contextValue}>
      {children}
    </WardrobeContext.Provider>
  );
}

export default WardrobeProvider;
