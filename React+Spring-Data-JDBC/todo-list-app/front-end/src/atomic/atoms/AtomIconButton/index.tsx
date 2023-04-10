import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";

type Props = IconButtonProps;

const index = (props: Props) => {
  return <IconButton {...props}>{props.children}</IconButton>;
};

export default index;
