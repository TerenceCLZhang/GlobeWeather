import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StatusType {
  loading: boolean;
  error: string;
}

const initialState: StatusType = {
  loading: false,
  error: "",
};

export const StatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeLoading: (state) => {
      state.loading = !state.loading;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const { changeLoading, setError, clearError } = StatusSlice.actions;

export default StatusSlice.reducer;
