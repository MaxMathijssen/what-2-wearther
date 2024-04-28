"use client";

import { Status, BodyPart, WardrobeItems, Avatar } from "@/typings/types";
import { createContext, useState, useMemo, PropsWithChildren } from "react";

type WardrobeContextType = {
  wardrobeEnabled: boolean;
  setWardrobeEnabled: (wardrobeEnabled: boolean) => void;
  wardrobeItems: WardrobeItems;
  setWardrobeItems: (items: WardrobeItems) => void;
  avatar: Avatar | null;
  setAvatar: (avatar: Avatar | null) => void;
};

export const WardrobeContext = createContext<WardrobeContextType>({
  wardrobeEnabled: false,
  setWardrobeEnabled: () => {},
  wardrobeItems: [],
  setWardrobeItems: () => {},
  avatar: null,
  setAvatar: () => {},
});

function WardrobeProvider({ children }: PropsWithChildren<{}>) {
  const [wardrobeEnabled, setWardrobeEnabled] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItems>([
    // Head Items
    {
      image: { src: "/head_bald.png", width: 50, height: 50, alt: "Head bald" },
      id: 1,
      status: Status.Dresser,
      bodyPart: BodyPart.Head,
      tempRange: {
        min: 10,
        max: 15,
      },
    },
    {
      image: {
        src: "/head_ginger.png",
        width: 49,
        height: 50,
        alt: "Head ginger",
      },
      id: 2,
      status: Status.Dresser,
      bodyPart: BodyPart.Head,
      tempRange: {
        min: 10,
        max: 15,
      },
    },
    {
      image: {
        src: "/head_blonde.png",
        width: 50,
        height: 50,
        alt: "Head blonde",
      },
      id: 3,
      status: Status.Dresser,
      bodyPart: BodyPart.Head,
      tempRange: {
        min: 10,
        max: 15,
      },
    },
    {
      image: {
        src: "/head_black.png",
        width: 50,
        height: 60,
        alt: "Head black",
      },
      id: 4,
      status: Status.Dresser,
      bodyPart: BodyPart.Head,
      tempRange: {
        min: 10,
        max: 15,
      },
    },
    {
      image: {
        src: "/head_beard.png",
        width: 50,
        height: 50,
        alt: "Head beard",
      },
      id: 5,
      status: Status.Dresser,
      bodyPart: BodyPart.Head,
      tempRange: {
        min: 10,
        max: 15,
      },
    },
    {
      image: {
        src: "/head_orange.png",
        width: 50,
        height: 55,
        alt: "Head orange",
      },
      id: 6,
      status: Status.Dresser,
      bodyPart: BodyPart.Head,
      tempRange: {
        min: 10,
        max: 15,
      },
    },
    // Body Items
    {
      image: {
        src: "/body_tanktop.png",
        width: 50,
        height: 68,
        alt: "Body tanktop",
      },
      id: 7,
      status: Status.Dresser,
      bodyPart: BodyPart.Body,
      tempRange: {
        min: 26,
        max: 50,
      },
    },
    {
      image: {
        src: "/body_hoodie.png",
        width: 50,
        height: 73,
        alt: "Body hoodie",
      },
      id: 8,
      status: Status.Dresser,
      bodyPart: BodyPart.Body,
      tempRange: {
        min: -50,
        max: 17,
      },
    },
    {
      image: { src: "/body_suit.png", width: 50, height: 67, alt: "Body suit" },
      id: 9,
      status: Status.Dresser,
      bodyPart: BodyPart.Body,
      tempRange: {
        min: -50,
        max: 16,
      },
    },
    {
      image: {
        src: "/body_tshirt.png",
        width: 50,
        height: 68,
        alt: "Body t-shirt",
      },
      id: 10,
      status: Status.Dresser,
      bodyPart: BodyPart.Body,
      tempRange: {
        min: 20,
        max: 25,
      },
    },
    {
      image: {
        src: "/body_jacket.png",
        width: 50,
        height: 67,
        alt: "Body jacket",
      },
      id: 11,
      status: Status.Dresser,
      bodyPart: BodyPart.Body,
      tempRange: {
        min: 12,
        max: 19,
      },
    },
    {
      image: {
        src: "/body_sweater.png",
        width: 50,
        height: 63,
        alt: "Body sweater",
      },
      id: 12,
      status: Status.Dresser,
      bodyPart: BodyPart.Body,
      tempRange: {
        min: -50,
        max: 18,
      },
    },
    // Leg Items
    {
      image: {
        src: "/legs_yellow.png",
        width: 40,
        height: 80,
        alt: "Legs yellow",
      },
      id: 13,
      status: Status.Dresser,
      bodyPart: BodyPart.Legs,
      tempRange: {
        min: 12,
        max: 19,
      },
    },
    {
      image: {
        src: "/legs_black.png",
        width: 40,
        height: 80,
        alt: "Legs black",
      },
      id: 14,
      status: Status.Dresser,
      bodyPart: BodyPart.Legs,
      tempRange: {
        min: 12,
        max: 19,
      },
    },
    {
      image: {
        src: "/legs_shorts.png",
        width: 40,
        height: 80,
        alt: "Legs shorts",
      },
      id: 15,
      status: Status.Dresser,
      bodyPart: BodyPart.Legs,
      tempRange: {
        min: 20,
        max: 50,
      },
    },
    {
      image: {
        src: "/legs_ripped.png",
        width: 40,
        height: 80,
        alt: "Legs ripped",
      },
      id: 16,
      status: Status.Dresser,
      bodyPart: BodyPart.Legs,
      tempRange: {
        min: 20,
        max: 25,
      },
    },
    {
      image: { src: "/legs_suit.png", width: 40, height: 80, alt: "Legs suit" },
      id: 17,
      status: Status.Dresser,
      bodyPart: BodyPart.Legs,
      tempRange: {
        min: 15,
        max: 19,
      },
    },
    {
      image: {
        src: "/legs_jeans.png",
        width: 40,
        height: 80,
        alt: "Legs jeans",
      },
      id: 18,
      status: Status.Dresser,
      bodyPart: BodyPart.Legs,
      tempRange: {
        min: -50,
        max: 19,
      },
    },
  ]);

  const [avatar, setAvatar] = useState<Avatar | null>(null);

  const contextValue = useMemo(
    () => ({
      wardrobeEnabled,
      setWardrobeEnabled,
      wardrobeItems,
      setWardrobeItems,
      avatar,
      setAvatar,
    }),
    [wardrobeEnabled, wardrobeItems, avatar]
  );

  return (
    <WardrobeContext.Provider value={contextValue}>
      {children}
    </WardrobeContext.Provider>
  );
}

export default WardrobeProvider;
