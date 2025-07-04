import Header from "./components/Header";
import Main from "./components/Main";
import { useSelector } from "react-redux";
import type { RootState } from "./state/store";
import { useEffect, useState } from "react";

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
