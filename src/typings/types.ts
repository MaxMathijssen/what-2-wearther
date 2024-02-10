export interface DailyForecast {
  dt: number;
  day: string;
  temp: {
    current?: number;
    day: number;
    night: number;
    eve: number;
    morn: number;
    min: number;
    max: number;
  };
  feels_like: number;
  weather: string;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  pop: number;
  rain: number;
  uvi: number;
}
