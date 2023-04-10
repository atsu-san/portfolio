import React from "react";
import {
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";

type Props = RadioGroupProps & {
  options: Omit<FormControlLabelProps, "control">[];
};

const index = (props: Props) => {
  return (
    <RadioGroup {...props}>
      {props.options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default index;
