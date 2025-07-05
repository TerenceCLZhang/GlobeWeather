import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocationInterface } from "../types/LocationInterface";

const initialState: LocationInterface = {
  lat: 40.7127281,
  lon: -74.0060152,
  name: "New York",
  state: "New York",
  country: "US",
};

export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationInterface>) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.name = action.payload.name;
      state.state = action.payload.state;
      state.country = action.payload.country;
    },
  },
});

export const { setLocation } = LocationSlice.actions;

export default LocationSlice.reducer;
