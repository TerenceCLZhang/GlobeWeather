import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

type WeatherState = WeatherDataInterface | null;

const initialState: WeatherState = null;

export const WeatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    // @ts-expect-error
    setWeatherData: (_state, action: PayloadAction<WeatherDataInterface>) => {
      return action.payload;
    },
    clearWeatherData: () => {
      return null;
    },
  },
});

export const { setWeatherData, clearWeatherData } = WeatherDataSlice.actions;

export default WeatherDataSlice.reducer;
