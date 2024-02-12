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
  dt: number;
  temp: number;
  feels_like: number;
  weather: string;
  iconPath: string;
}
