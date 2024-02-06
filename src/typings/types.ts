export interface DailyForecast {
  dt: number;
  day: string;
  temp: {
    current?: number;
    min: number;
    max: number;
  };
  weather: string;
}
