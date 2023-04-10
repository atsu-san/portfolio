import React from "react";
import { Checkbox, CheckboxProps } from "@mui/material";

type Props = CheckboxProps;

const index = (props: Props) => {
  return <Checkbox {...props} />;
};

export default index;
