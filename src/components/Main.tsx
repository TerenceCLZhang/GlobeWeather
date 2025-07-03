import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import Form from "./Form";
import WeatherDataDisplay from "./WeatherDataDisplay";
import { useEffect, useState } from "react";
import { WeatherDataFetch } from "../api/WeatherDataFetch";
import { clearWeatherData, setWeatherData } from "../state/WeatherDataSlice";
import { changeLoading, clearError, setError } from "../state/StatusSlice";

function Main() {
  const [location, setLocation] = useState<string>("Auckland");

  const unit = useSelector((state: RootState) => state.unit.unit);
  const weatherData = useSelector((state: RootState) => state.weatherData.data);
  const status = useSelector((state: RootState) => state.status);

  const dispatch = useDispatch();

  useEffect(() => {
    WeatherDataFetch(
      unit,
      location,
      () => dispatch(clearError()),
      () => dispatch(changeLoading()),
      (data) => dispatch(setWeatherData(data)),
      () => dispatch(clearWeatherData()),
      (msg) => dispatch(setError(msg))
    );
  }, [location, unit]);

  return (
    <main>
      <section className="flex flex-col justify-start gap-10 w-full overflow-hidden">
        <div>
          <span className="text-4xl">
            {status.loading
              ? "Loading..."
              : weatherData
              ? weatherData?.countryCode
              : "N/A"}
          </span>
          <h2 className="text-8xl font-bold break-words">
            {status.loading
              ? "Loading..."
              : weatherData
              ? weatherData?.countryName
              : "N/A"}
          </h2>
        </div>
        <Form location={location} setLocation={setLocation} />
      </section>

      <WeatherDataDisplay />
    </main>
  );
}

export default Main;
