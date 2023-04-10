import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableCellProps,
  TableProps,
  Paper,
} from "@mui/material";

export type Props = {
  columns: TColumn[];
  data: (string | number)[][];
  propsTable?: TableProps;
  propsHeader?: TableCellProps;
  propsBody?: TableCellProps;
};

export type TColumn = {
  id: number | string;
  label: string;
  align?: TableCellProps["align"];
};

const index = (props: Props) => {
  const { columns, data, propsTable, propsHeader, propsBody } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", margin: "8px" }}>
        <TableContainer>
          <Table {...propsTable}>
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell key={i} align={column.align} {...propsHeader}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => {
                return (
                  <TableRow key={i} hover>
                    {row.map((cell, j) => {
                      return (
                        <TableCell key={j} {...propsBody}>
                          {cell}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default index;
