import React from "react";
import { TableCell, TableCellProps } from "@mui/material";

type Props = TableCellProps;

const index = (props: Props) => {
  return <TableCell {...props}>{props.children}</TableCell>;
};

export default index;
