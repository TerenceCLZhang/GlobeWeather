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
    setLocation: (_, action: PayloadAction<LocationInterface>) => {
      return action.payload;
    },
  },
});

export const { setLocation } = LocationSlice.actions;

export default LocationSlice.reducer;
