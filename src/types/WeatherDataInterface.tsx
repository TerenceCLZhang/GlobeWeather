export interface WeatherDataInterface {
  countryCode: string;
  countryName: string;
  dt: number;
  timezone: number;
  temp: number;
  pressure: number;
  windSpeed: number;
  humidity: number;
  weatherType: string;
  minTemp: number;
  maxTemp: number;
  feelsLike: number;
  cloudiness: number;
}
