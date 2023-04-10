/** @jsxImportSource @emotion/react */
import React from "react";
import {
  Box,
  Container,
  Dialog,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
  IconButton,
  css,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type Props = DialogProps & {
  onClose: () => void;
  dialogTitleProps?: DialogTitleProps;
};

const index = (props: Props) => {
  return (
    <Dialog onClick={(e) => e.stopPropagation} {...props}>
      <Container>
        <DialogTitle {...props.dialogTitleProps}>
          <Box css={dialogTitleStyle}>{props.title}</Box>
          <IconButton
            aria-label="close"
            onClick={props.onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box css={mainStyle}>{props.children}</Box>
      </Container>
    </Dialog>
  );
};

const mainStyle = css({
  margin: "1em 0",
});

const dialogTitleStyle = css({
  display: "flex",
  justifyContent: "center",
});

export default index;
