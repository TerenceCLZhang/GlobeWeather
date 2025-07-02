import { createSlice } from "@reduxjs/toolkit";

interface UnitType {
  unit: "metric" | "imperial";
}

const initialState: UnitType = { unit: "metric" };

export const UnitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    changeUnit: (state) => {
      state.unit === "metric"
        ? (state.unit = "imperial")
        : (state.unit = "metric");
    },
  },
});

export const { changeUnit } = UnitSlice.actions;

export default UnitSlice.reducer;
