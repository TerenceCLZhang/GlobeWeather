import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

const initialState: WeatherDataInterface | null = null;

export const WeatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setWeatherData: (
      state: WeatherDataInterface | null,
      action: PayloadAction<WeatherDataInterface | null>
    ) => {
      state = action.payload;
    },
  },
});

export const { setWeatherData } = WeatherDataSlice.actions;

export default WeatherDataSlice.reducer;
