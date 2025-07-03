import { configureStore } from "@reduxjs/toolkit";
import UnitReducer from "./UnitSlice";
import WeatherReducer from "./WeatherDataSlice";
import StatusReducer from "./StatusSlice";

export const store = configureStore({
  reducer: {
    unit: UnitReducer,
    weatherData: WeatherReducer,
    status: StatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
