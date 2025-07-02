import { createSlice } from "@reduxjs/toolkit";

type UnitType = "metric" | "imperial";

const initialState: UnitType = "metric";

export const UnitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    // @ts-expect-error
    changeUnit: (state) => {
      return state === "metric" ? "imperial" : "metric";
    },
  },
});

export const { changeUnit } = UnitSlice.actions;

export default UnitSlice.reducer;
