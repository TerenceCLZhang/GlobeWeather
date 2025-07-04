import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

const initialState: WeatherDataInterface = {
  dt: -1,
  timezone: -1,
  temp: -1,
  pressure: -1,
  windSpeed: -1,
  humidity: -1,
  main: "",
  weatherType: "",
  minTemp: -1,
  maxTemp: -1,
  feelsLike: -1,
  cloudiness: -1,
};

export const WeatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherDataInterface>) => {
      state.dt = action.payload.dt;
      state.timezone = action.payload.timezone;
      state.temp = action.payload.temp;
      state.pressure = action.payload.pressure;
      state.windSpeed = action.payload.windSpeed;
      state.humidity = action.payload.humidity;
      state.main = action.payload.main;
      state.weatherType = action.payload.weatherType;
      state.minTemp = action.payload.minTemp;
      state.maxTemp = action.payload.maxTemp;
      state.feelsLike = action.payload.feelsLike;
      state.cloudiness = action.payload.cloudiness;
    },
    clearWeatherData: () => {
      return initialState;
    },
  },
});

export const { setWeatherData, clearWeatherData } = WeatherDataSlice.actions;

export default WeatherDataSlice.reducer;
