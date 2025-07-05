import { configureStore } from "@reduxjs/toolkit";
import UnitReducer from "./unitSlice";
import WeatherReducer from "./weatherDataSlice";
import StatusReducer from "./statusSlice";
import LocationReducer from "./locationSlice";

export const store = configureStore({
  reducer: {
    unit: UnitReducer,
    weatherData: WeatherReducer,
    status: StatusReducer,
    location: LocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
