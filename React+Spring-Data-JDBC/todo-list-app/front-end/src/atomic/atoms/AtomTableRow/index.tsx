import React from "react";
import { TableRow, TableRowProps } from "@mui/material";

type Props = TableRowProps;

const index = (props: Props) => {
  return <TableRow {...props}>{props.children}</TableRow>;
};

export default index;
