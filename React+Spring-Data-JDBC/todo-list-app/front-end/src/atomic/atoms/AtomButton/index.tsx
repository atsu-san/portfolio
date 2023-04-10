import { Box, Button, ButtonProps } from "@mui/material";
import React from "react";

type TButtonWidth = { width?: "wide" | "medium" | "narrow" };

type Props = TButtonWidth & ButtonProps;

const index = (props: Props) => {
  const { width = "medium", color = "primary", variant = "contained" } = props;
  const widthPx =
    width === "medium" ? "120px" : width === "wide" ? "180px" : "60px";

  return (
    <Box>
      <Button
        color={color}
        variant={variant}
        sx={[
          {
            m: "8px",
            width: widthPx,
          },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
        {...props}
      >
        {props.children}
      </Button>
    </Box>
  );
};

export default index;
