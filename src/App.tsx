import Header from "./components/Header";
import Main from "./components/Main";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./state/store";
import { useEffect, useState } from "react";
import { WeatherDataFetch } from "./api/WeatherDataFetch";
import { changeLoading, clearError, setError } from "./state/StatusSlice";
import { clearWeatherData, setWeatherData } from "./state/WeatherDataSlice";
import { setLocation } from "./state/LocationSlice";
import { fetchGeoDataLatLon } from "./api/GeoLocation";

function App() {
  const [bgImage, setBgImage] = useState<String>("default");

  const validType = [
    "clear",
    "clouds",
    "drizzle",
    "rain",
    "snow",
    "thunderstorm",
  ];

  const weatherData = useSelector((state: RootState) => state.weatherData);
  const loading = useSelector((state: RootState) => state.status.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      WeatherDataFetch(
        lat,
        lon,
        () => dispatch(clearError()),
        () => dispatch(changeLoading()),
        (data) => dispatch(setWeatherData(data)),
        () => dispatch(clearWeatherData()),
        (msg) => dispatch(setError(msg))
      );

      const location = await fetchGeoDataLatLon(lat, lon);
      dispatch(setLocation(location[0]));
    });
  }, []);

  useEffect(() => {
    setBgImage("default");
    const weatherType = weatherData?.main;
    const type = weatherType?.toLowerCase();
    const image = type && validType.includes(type) ? type : "default";
    setBgImage(image);
  }, [weatherData]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full -z-10 transition-opacity duration-700 bg-center bg-no-repeat bg-cover`}
        style={{
          backgroundImage: loading ? "none" : `url('/assets/${bgImage}.jpg')`,
        }}
      ></div>
      <div className="fixed -z-10 inset-0 bg-black/60"></div>
      <Header />
      <Main />
    </>
  );
}

export default App;
