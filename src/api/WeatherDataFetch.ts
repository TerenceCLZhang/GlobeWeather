import axios from "axios";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";
import { handleAxiosError } from "./HandleAxiosError";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const WeatherDataFetch = async (
  lat: number,
  lon: number,
  clearError: () => void,
  changeLoading: () => void,
  setWeatherData: (data: WeatherDataInterface) => void,
  clearWeatherData: () => void,
  setError: (msg: string) => void
) => {
  try {
    clearError();
    changeLoading();

    console.log("API CALLED");

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
        },
      }
    );

    const data = response.data;

    const weatherData: WeatherDataInterface = {
      dt: data.dt,
      timezone: data.timezone,
      temp: data.main.temp,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      main: data.weather[0].main,
      weatherType:
        data.weather[0].description
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Unknown",
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      feelsLike: data.main.feels_like,
      cloudiness: data.clouds.all,
    };

    setWeatherData(weatherData);
  } catch (error) {
    clearWeatherData();
    handleAxiosError(error, setError);
  } finally {
    changeLoading();
  }
};
