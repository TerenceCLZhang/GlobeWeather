import { configureStore } from "@reduxjs/toolkit";
import UnitReducer from "./UnitSlice";
import WeatherReducer from "./WeatherDataSlice";

export const store = configureStore({
  reducer: {
    unit: UnitReducer,
    weatherData: WeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
