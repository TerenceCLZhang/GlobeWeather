import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

interface WeatherState {
  data: WeatherDataInterface | null;
}

const initialState: WeatherState = { data: null };

export const WeatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherDataInterface>) => {
      state.data = action.payload;
    },
    clearWeatherData: (state) => {
      state.data = null;
    },
  },
});

export const { setWeatherData, clearWeatherData } = WeatherDataSlice.actions;

export default WeatherDataSlice.reducer;
