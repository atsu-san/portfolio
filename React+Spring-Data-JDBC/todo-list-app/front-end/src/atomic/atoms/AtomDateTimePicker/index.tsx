/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, css } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

type Props = DateTimePickerProps<Dayjs>;

const index = (props: Props) => {
  return (
    <Box css={containerStyle}>
      <DateTimePicker
        sx={[
          { width: 240 },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
        {...props}
      />
    </Box>
  );
};

const containerStyle = () =>
  css({
    display: "flex",
    justifyContent: "space-between",
    margin: "1em 0",
  });

export default index;
