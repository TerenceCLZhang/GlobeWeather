import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import WeatherData from "./WeatherData";
import { useEffect, useState } from "react";

function WeatherDataDisplay() {
  const [date, setDate] = useState<String>("");

  const unit = useSelector((state: RootState) => state.unit.unit);
  const weatherData = useSelector((state: RootState) => state.weatherData.data);
  const status = useSelector((state: RootState) => state.status);

  useEffect(() => {
    if (!weatherData) {
      setDate("");
      return;
    }

    const { dt, timezone } = weatherData;

    const localTimeMs = (dt + timezone) * 1000;
    const localDate = new Date(localTimeMs);

    const formattedDate = new Intl.DateTimeFormat("en-NZ", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(localDate);

    setDate(formattedDate);
  }, [weatherData]);

  return (
    <section className="black-background flex flex-col items-center justify-center text-center w-[80%] h-full gap-5">
      {weatherData && !status.loading ? (
        <>
          <h2 className="text-7xl font-semibold">
            {weatherData.temp}
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
