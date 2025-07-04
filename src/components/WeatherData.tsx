import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import {
  kelvinToCelsius,
  kelvinToFahrenheit,
  msToKph,
  msToMph,
} from "../utility/utility";

function WeatherData() {
  const unit = useSelector((state: RootState) => state.unit.unit);
  const weatherData = useSelector((state: RootState) => state.weatherData);

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "km/h" : "mph";

  const formatValue = (value: any, suffix: string = "") => {
    if (typeof value === "number" && suffix !== "hPa" && suffix !== "%")
      value = value.toFixed(2);
    return `${value}${suffix}`;
  };

  const weatherDetails = [
    {
      label: "Pressure",
      value: formatValue(weatherData!.pressure, "hPa"),
    },
    {
      label: "Wind Speed",
      value: formatValue(
        unit == "metric"
          ? msToKph(weatherData!.windSpeed)
          : msToMph(weatherData!.windSpeed),
        speedUnit
      ),
    },
    {
      label: "Humidity",
      value: formatValue(weatherData!.humidity, "%"),
    },
    {
      label: "Weather Type",
      value: formatValue(weatherData!.weatherType),
    },
    {
      label: "Min Temp",
      value: formatValue(
        unit === "metric"
          ? kelvinToCelsius(weatherData!.minTemp)
          : kelvinToFahrenheit(weatherData!.minTemp),
        tempUnit
      ),
    },
    {
      label: "Max Temp",
      value: formatValue(
        unit === "metric"
          ? kelvinToCelsius(weatherData!.maxTemp)
          : kelvinToFahrenheit(weatherData!.maxTemp),
        tempUnit
      ),
    },
    {
      label: "Feels Like",
      value: formatValue(
        unit === "metric"
          ? kelvinToCelsius(weatherData!.feelsLike)
          : kelvinToFahrenheit(weatherData!.feelsLike),
        tempUnit
      ),
    },
    {
      label: "Cloudiness",
      value: formatValue(weatherData?.cloudiness, "%"),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-10 xl:gap-x-30 xl:gap-y-5">
      {weatherDetails.map((item, index) => (
        <div className="weather-info-block" key={index}>
          <b>{item.label}</b>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default WeatherData;
