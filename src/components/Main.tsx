import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import Form from "./Form";
import WeatherDataDisplay from "./WeatherDataDisplay";
import { useEffect } from "react";
import { WeatherDataFetch } from "../api/WeatherDataFetch";
import { clearWeatherData, setWeatherData } from "../state/WeatherDataSlice";
import { changeLoading, clearError, setError } from "../state/StatusSlice";

function Main() {
  const location = useSelector((state: RootState) => state.location);
  const weatherData = useSelector((state: RootState) => state.weatherData);
  const status = useSelector((state: RootState) => state.status);

  const dispatch = useDispatch();

  useEffect(() => {
    setError("");
    WeatherDataFetch(
      location.lat,
      location.lon,
      () => dispatch(clearError()),
      () => dispatch(changeLoading()),
      (data) => dispatch(setWeatherData(data)),
      () => dispatch(clearWeatherData()),
      (msg) => dispatch(setError(msg))
    );
  }, [location]);

  return (
    <main>
      <section className="flex flex-col justify-start gap-5 w-full">
        <div className="md:mb-5">
          <span className="text-2xl xl:text-4xl">
            {status.loading
              ? "Loading..."
              : weatherData.temp !== -1
              ? `${location.state ? `${location.state}, ` : ""}${
                  location.country
                }`
              : "N/A"}
          </span>
          <h2 className="text-6xl xl:text-8xl font-bold break-words">
            {status.loading
              ? "Loading..."
              : weatherData.temp !== -1
              ? location.name
              : "N/A"}
          </h2>
        </div>
        <Form />
        <p className="text-center lg:text-left">
          <b>Latitude</b>:{" "}
          {status.loading
            ? "Loading..."
            : weatherData.temp !== -1
            ? location.lat.toFixed(2)
            : "N/A"}{" "}
          <b>Longitude</b>:{" "}
          {status.loading
            ? "Loading..."
            : weatherData.temp !== -1
            ? location.lon.toFixed(2)
            : "N/A"}
        </p>
      </section>

      <WeatherDataDisplay />
    </main>
  );
}

export default Main;
