import { createSlice } from "@reduxjs/toolkit";

interface UnitType {
  measurement: "metric" | "imperial";
}

const initialState: UnitType = {
  measurement: "metric",
};

export const UnitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    changeUnit: (state: UnitType) => {
      if (state.measurement === "metric") state.measurement = "imperial";
      else state.measurement = "metric";
    },
  },
});

export const { changeUnit } = UnitSlice.actions;

export default UnitSlice.reducer;
