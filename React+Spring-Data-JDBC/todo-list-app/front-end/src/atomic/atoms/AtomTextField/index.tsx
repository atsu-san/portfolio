/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, TextField, TextFieldProps, css } from "@mui/material";

type Props = TextFieldProps;

const index = (props: Props) => {
  return (
    <Box css={containerStyle}>
      <TextField {...props}>{props.children}</TextField>
    </Box>
  );
};

const containerStyle = () =>
  css({
    margin: "0.5em",
    width: "100%",
  });

export default index;
