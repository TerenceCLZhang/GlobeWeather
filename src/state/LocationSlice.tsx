import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocationInterface } from "../types/LocationInterface";

const initialState: LocationInterface = {
  lat: NaN,
  lon: NaN,
  name: "",
  state: "",
  country: "",
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
