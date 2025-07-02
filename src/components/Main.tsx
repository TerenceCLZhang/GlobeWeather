import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Form from "./Form";
import WeatherDataDisplay from "./WeatherDataDisplay";
import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

function Main() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [location, setLocation] = useState<string>("Auckland");
  const [weatherData, setWeatherData] = useState<
    WeatherDataInterface | undefined
  >();

  const unit = useSelector((state: RootState) => state.unit);

  useEffect(() => {
    fetchData(location, unit.measurement, setLoading, setWeatherData, setError);
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
        <Form setLocation={setLocation} setWeatherData={setWeatherData} />
      </section>

      <WeatherDataDisplay
        weatherData={weatherData}
        loading={loading}
        error={error}
      />
    </main>
  );
}

export default Main;
