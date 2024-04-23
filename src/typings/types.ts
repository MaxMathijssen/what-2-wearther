export interface DailyForecast {
  dt: number;
  day: string;
  day_num: number;
  temp: {
    current?: number;
    day: number;
    night: number;
    eve: number;
    morn: number;
    min: number;
    max: number;
  };
  feels_like: {
    current?: number;
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  sunrise: string;
  sunset: string;
  weather: string;
  clouds: number;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  wind_gust: number;
  pop: number;
  rain: number;
  uvi: number;
  iconPath: string;
  color: string;
  hourly_forecast: HourlyForecast[];
}

export interface HourlyForecast {
  hour_index: number;
  dt: number;
  hour: string;
  hour_num: number;
  temp: number;
  feels_like: number;
  weather: string;
  iconPath: string;
}

export enum Status {
  Dresser = "dresser",
  Wardrobe = "wardrobe",
  Avatar = "avatar",
}

export enum BodyPart {
  Head = "head",
  Body = "body",
  Legs = "legs",
}

export interface WardrobeItem {
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  id: number;
  status: Status;
  bodyPart: BodyPart;
  justMovedBack?: boolean; // add this line, using optional if it's not always present
}

export type WardrobeItems = WardrobeItem[];
