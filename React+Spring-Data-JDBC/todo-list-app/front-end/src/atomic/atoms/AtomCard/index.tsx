import React from "react";
import { Card, CardProps } from "@mui/material";

type Props = CardProps;

const index = (props: Props) => {
  return <Card {...props}>{props.children}</Card>;
};

export default index;
