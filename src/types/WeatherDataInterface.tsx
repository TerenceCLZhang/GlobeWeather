export interface WeatherDataInterface {
  dt: number;
  timezone: number;
  temp: number;
  pressure: number;
  windSpeed: number;
  humidity: number;
  main: string;
  weatherType: string;
  minTemp: number;
  maxTemp: number;
  feelsLike: number;
  cloudiness: number;
}
