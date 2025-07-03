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

  const weatherType = useSelector(
    (state: RootState) => state.weatherData.data?.main
  );
  const loading = useSelector((state: RootState) => state.status.loading);

  useEffect(() => {
    const type = weatherType?.toLowerCase();
    const image = type && validType.includes(type) ? type : "default";
    setBgImage(image);
  }, [weatherType]);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 ${
          loading
            ? "bg-gray-600"
            : `bg-[url('./assets/${bgImage}.jpg')] bg-center bg-no-repeat bg-cover`
        }`}
      ></div>
      <div className="absolute -z-10 inset-0 bg-black/60"></div>
      <Header />
      <Main />
    </>
  );
}

export default App;
