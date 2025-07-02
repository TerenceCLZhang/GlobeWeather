import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

interface Props {
  weatherData: WeatherDataInterface | undefined;
}

function WeatherData({ weatherData }: Props) {
  const unit = useSelector((state: RootState) => state.unit);

  const tempUnit = unit.measurement === "metric" ? "°C" : "°F";
  const speedUnit = unit.measurement === "metric" ? "km/h" : "mph";

  const formatValue = (value: any, suffix: string = "") => {
    return `${value}${suffix}`;
  };

  const weatherDetails = [
    {
      label: "Pressure",
      value: formatValue(weatherData?.pressure, "hPa"),
    },
    {
      label: "Wind Speed",
      value: formatValue(weatherData?.windSpeed, speedUnit),
    },
    {
      label: "Humidity",
      value: formatValue(weatherData?.humidity, "%"),
    },
    {
      label: "Weather Type",
      value: formatValue(weatherData?.weatherType),
    },
    {
      label: "Min Temp",
      value: formatValue(weatherData?.minTemp, tempUnit),
    },
    {
      label: "Max Temp",
      value: formatValue(weatherData?.maxTemp, tempUnit),
    },
    {
      label: "Feels Like",
      value: formatValue(weatherData?.feelsLike, tempUnit),
    },
    {
      label: "Cloudiness",
      value: formatValue(weatherData?.cloudiness, "%"),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-30 gap-y-5">
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
