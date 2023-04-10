import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { SnackbarProps } from "@mui/material";

export type AtomSnackbarState = SnackbarProps;

const initialState: AtomSnackbarState = {
  open: false,
  message: "",
};

export const atomSnackbarSlice = createSlice({
  name: "atomSnackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.message = action.payload;
    },
    closeSnackbar: () => initialState,
  },
});

export const { openSnackbar, closeSnackbar } = atomSnackbarSlice.actions;

export const atomSnackbarSliceSelector = (state: RootState) =>
  state.atomSnackbarSlice;

export default atomSnackbarSlice.reducer;
