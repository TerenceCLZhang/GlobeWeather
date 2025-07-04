import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import WeatherData from "./WeatherData";
import { useEffect, useState } from "react";
import { kelvinToCelsius, kelvinToFahrenheit } from "../utility/utility";

function WeatherDataDisplay() {
  const [date, setDate] = useState<String>("");

  const unit = useSelector((state: RootState) => state.unit.unit);
  const weatherData = useSelector((state: RootState) => state.weatherData);
  const status = useSelector((state: RootState) => state.status);

  useEffect(() => {
    if (!weatherData) {
      setDate("");
      return;
    }

    const { dt, timezone } = weatherData;

    const utc_seconds = dt + timezone;
    const utc_milliseconds = utc_seconds * 1000;
    const localDate = new Date(utc_milliseconds);

    const formattedDate = new Intl.DateTimeFormat("en-NZ", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(localDate);

    setDate(formattedDate);
  }, [weatherData]);

  return (
    <section className="black-background flex flex-col items-center justify-center text-center w-full xl:w-3/5 h-full gap-5">
      {weatherData.temp !== -1 && !status.loading ? (
        <>
          <h2 className="text-6xl xl:text-7xl font-semibold">
            {unit == "metric"
              ? kelvinToCelsius(weatherData.temp).toFixed(2)
              : kelvinToFahrenheit(weatherData.temp).toFixed(2)}
            {unit === "metric" ? "°C" : "°F"}
          </h2>
          <span className="mb-4">{date}</span>
          <WeatherData />
        </>
      ) : (
        <p>
          {status.loading
            ? "Loading..."
            : status.error
            ? status.error
            : "An unexpected error occured"}
        </p>
      )}
    </section>
  );
}

export default WeatherDataDisplay;
