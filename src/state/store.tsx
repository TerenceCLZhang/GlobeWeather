import { configureStore } from "@reduxjs/toolkit";
import UnitReducer from "./UnitSlice";
import WeatherReducer from "./WeatherDataSlice";
import StatusReducer from "./StatusSlice";
import LocationReducer from "./LocationSlice";

export const store = configureStore({
  reducer: {
    unit: UnitReducer,
    weatherData: WeatherReducer,
    status: StatusReducer,
    location: LocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
