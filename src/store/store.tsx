import { configureStore } from "@reduxjs/toolkit";
import UnitReducer from "./UnitSlice";

export const store = configureStore({
  reducer: {
    unit: UnitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
