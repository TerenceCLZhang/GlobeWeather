import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";
import WeatherData from "./WeatherData";
import { useEffect, useState } from "react";

interface Props {
  weatherData: WeatherDataInterface | undefined;
  loading: boolean;
  error: string;
}

function WeatherDataDisplay({ weatherData, loading, error }: Props) {
  const [date, setDate] = useState<String>("");
  const unit = useSelector((state: RootState) => state.unit);

  useEffect(() => {
    if (!weatherData) {
      setDate("");
      return;
    }
    const epochTime = weatherData?.date;
    const date = new Date(epochTime * 1000);
    const formattedDate = date.toLocaleDateString("en-nz", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setDate(formattedDate);
  }, [weatherData]);

  return (
    <section className="black-background flex flex-col items-center justify-center text-center w-[80%] h-full gap-5">
      {weatherData && !loading ? (
        <>
          <h2 className="text-7xl font-semibold">
            {weatherData.temp}
            {unit.measurement === "metric" ? "°C" : "°F"}
          </h2>
          <span className="mb-4">{date}</span>
          <WeatherData weatherData={weatherData} />
        </>
      ) : (
        <p>{loading ? "Loading..." : error ? error : "Unexpected state"}</p>
      )}
    </section>
  );
}

export default WeatherDataDisplay;
