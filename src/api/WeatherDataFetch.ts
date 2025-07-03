import axios from "axios";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const WeatherDataFetch = async (
  unit: "metric" | "imperial",
  location: string,
  clearError: () => void,
  changeLoading: () => void,
  setWeatherData: (data: WeatherDataInterface) => void,
  clearWeatherData: () => void,
  setError: (msg: string) => void
) => {
  try {
    clearError();
    changeLoading();

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: location.toLowerCase(),
          units: unit,
          appid: API_KEY,
        },
      }
    );

    const data = response.data;

    const weatherData: WeatherDataInterface = {
      countryCode: data.sys.country,
      countryName: data.name,
      dt: data.dt,
      timezone: data.timezone,
      temp: data.main.temp.toFixed(2),
      pressure: data.main.pressure,
      windSpeed: data.wind.speed.toFixed(2),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      weatherType:
        data.weather[0].description
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Unknown",
      minTemp: data.main.temp_min.toFixed(2),
      maxTemp: data.main.temp_max.toFixed(2),
      feelsLike: data.main.feels_like.toFixed(2),
      cloudiness: data.clouds.all,
    };

    setWeatherData(weatherData);
  } catch (error) {
    setError("ERROR: location does not exist");
    clearWeatherData();
    console.log(error);
  } finally {
    changeLoading();
  }
};
