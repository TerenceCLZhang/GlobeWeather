import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import Form from "./Form";
import WeatherDataDisplay from "./WeatherDataDisplay";
import { useEffect, useState } from "react";
import { clearWeatherData, setWeatherData } from "../state/WeatherDataSlice";
import axios from "axios";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

function Main() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [location, setLocation] = useState<string>("Auckland");

  const unit = useSelector((state: RootState) => state.unit.unit);
  const weatherData = useSelector((state: RootState) => state.weatherData.data);

  const dispatch = useDispatch();

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        setLoading(true);

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
          weatherType:
            data.weather[0]?.description
              .split(" ")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(" ") || "Unknown",
          minTemp: data.main.temp_min.toFixed(2),
          maxTemp: data.main.temp_max.toFixed(2),
          feelsLike: data.main.feels_like.toFixed(2),
          cloudiness: data.clouds.all,
        };

        dispatch(setWeatherData(weatherData));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const statusCode = error.response?.status;
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An error occured";
          setError(`ERROR ${statusCode}: ${errorMessage}.`);
        } else {
          setError("An unexpected error occured.");
        }
        dispatch(clearWeatherData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, unit]);

  return (
    <main>
      <section className="flex flex-col justify-start gap-10 w-full overflow-hidden">
        <div>
          <span className="text-4xl">
            {loading
              ? "Loading..."
              : weatherData
              ? weatherData?.countryCode
              : "N/A"}
          </span>
          <h2 className="text-8xl font-bold break-words">
            {loading
              ? "Loading..."
              : weatherData
              ? weatherData?.countryName
              : "N/A"}
          </h2>
        </div>
        <Form location={location} setLocation={setLocation} />
      </section>

      <WeatherDataDisplay loading={loading} error={error} />
    </main>
  );
}

export default Main;
