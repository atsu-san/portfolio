import React from "react";
import { Snackbar } from "@mui/material";
import { atomSnackbarSliceSelector, closeSnackbar } from "./atomSnackbar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const index = () => {
  const slice = useAppSelector(atomSnackbarSliceSelector);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={slice.open}
      autoHideDuration={3000}
      onClose={() => dispatch(closeSnackbar())}
      message={slice.message}
    />
  );
};

export default index;
