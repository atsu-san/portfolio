import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

export type TMenuItem = {
  value: number;
  name: string;
};

type Props = SelectProps & {
  menuItemList: TMenuItem[];
};

const index = (props: Props) => {
  const { menuItemList, ...selectProps } = props;
  return (
    <FormControl sx={{ m: "1em", width: "100%" }}>
      <InputLabel>{props.label}</InputLabel>
      <Select {...selectProps}>
        {menuItemList.map((item, idx) => (
          <MenuItem key={idx} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default index;
