/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, css } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";
import useTodoEdit, { Props } from "./hook";
import AtomButton from "../../../atomic/atoms/AtomButton";
import AtomTextField from "../../../atomic/atoms/AtomTextField";
import AtomDateTimePicker from "../../../atomic/atoms/AtomDateTimePicker";
import AtomSelect from "../../../atomic/atoms/AtomSelect";
import AtomRadio from "../../../atomic/atoms/AtomRadio";

const index: React.FC<Props> = (props: Props) => {
  const hook = useTodoEdit(props);

  return (
    <Box css={containerStyle}>
      <AtomTextField
        label="Name"
        value={hook.name}
        onChange={hook.onChangeHandler.name}
        required
        fullWidth
      >
        {hook.name}
      </AtomTextField>

      <Box css={startEndTimesStyle}>
        <AtomDateTimePicker
          label="Start Time"
          value={hook.startTime}
          onChange={hook.onChangeHandler.startTime}
          onAccept={hook.onChangeHandler.startTime}
          onError={(newError) => hook.setStartTimeError(newError ?? "")}
          slotProps={{
            textField: {
              helperText: hook.startTimeErrorMsg,
            },
          }}
          maxDate={hook.endTime ?? undefined}
        />
        <HorizontalRule />
        <AtomDateTimePicker
          label="End Time"
          value={hook.endTime}
          onChange={hook.onChangeHandler.endTime}
          onAccept={hook.onChangeHandler.endTime}
          onError={(newError) => hook.setEndTimeError(newError ?? "")}
          slotProps={{
            textField: {
              helperText: hook.endTimeErrorMsg,
            },
          }}
          minDate={hook.startTime ?? undefined}
        />
      </Box>

      <AtomSelect
        label="Type"
        value={hook.type}
        onChange={hook.onChangeHandler.type}
        fullWidth
        menuItemList={hook.menuItemList ?? []}
      />

      {props.todoItem !== null && (
        <AtomRadio
          row
          value={hook.status}
          options={[
            { value: 0, label: "Not done" },
            { value: 1, label: "Done" },
          ]}
          onChange={hook.onChangeHandler.statusRadio}
        />
      )}

      <Box css={buttonStyle}>
        <AtomButton onClick={hook.onClickHandler.createUpdateBtn} width="wide">
          {props.displayMode === 0 ? "Create" : "Update"}
        </AtomButton>
      </Box>
    </Box>
  );
};

const containerStyle = () =>
  css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  });

const startEndTimesStyle = () =>
  css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1em",
  });

const buttonStyle = () =>
  css({
    display: "flex",
    alignItems: "center",
  });

export default React.memo(index);
