/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, css } from "@mui/material";
import AtomDialog, { Props as AtomDialogProps } from "../../atoms/AtomDialog";
import AtomButton from "../../atoms/AtomButton";

type Props = AtomDialogProps & {
  message: string;
  onOkClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const index = (props: Props) => {
  const { message, onOkClick, ...dialogProps } = props;
  return (
    <AtomDialog {...dialogProps}>
      <Box css={messageStyle}>{message}</Box>
      <Box css={buttonsStyle}>
        <AtomButton onClick={onOkClick}>OK</AtomButton>
        <AtomButton onClick={dialogProps.onClose}>Cancel</AtomButton>
      </Box>
    </AtomDialog>
  );
};

const messageStyle = css({
  margin: "1em",
});

const buttonsStyle = css({
  display: "flex",
  justifyContent: "center",
});

export default index;
