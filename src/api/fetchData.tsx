import axios from "axios";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchData = async (
  location: string,
  units: "metric" | "imperial",
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setWeatherData: React.Dispatch<
    React.SetStateAction<WeatherDataInterface | undefined>
  >,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: location.toLowerCase(),
          units: units,
          appid: API_KEY,
        },
      }
    );

    const data = response.data;

    const weatherData: WeatherDataInterface = {
      countryCode: data.sys.country,
      countryName: data.name,
      date: data.dt,
      temp: data.main.temp.toFixed(2),
      pressure: data.main.pressure,
      windSpeed: data.wind.speed.toFixed(2),
      humidity: data.main.humidity,
      weatherType: data.weather[0]?.main || "Unknown",
      minTemp: data.main.temp_min.toFixed(2),
      maxTemp: data.main.temp_max.toFixed(2),
      feelsLike: data.main.feels_like.toFixed(2),
      cloudiness: data.clouds.all,
    };

    setWeatherData(weatherData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage =
        error.response?.data?.message || error.message || "An error occured";
      setError(`ERROR ${statusCode}: ${errorMessage}.`);
    } else {
      setError("An unexpected error occured.");
    }
  } finally {
    setLoading(false);
  }
};
