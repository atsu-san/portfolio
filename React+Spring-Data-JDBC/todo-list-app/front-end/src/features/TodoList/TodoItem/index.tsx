/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import { Edit, Delete } from "@mui/icons-material";
import { DateTimeUtils } from "../../../utils/DateTimeUtils";
import useTodoItem, { Props } from "./hook";
import TodoEdit from "../TodoEdit";
import AtomCard from "../../../atomic/atoms/AtomCard";
import AtomCheckbox from "../../../atomic/atoms/AtomCheckbox";
import AtomDialog from "../../../atomic/atoms/AtomDialog";
import AtomIconButton from "../../../atomic/atoms/AtomIconButton";
import MoleculeConfirmDialog from "../../../atomic/molecules/MoleculeConfirmDialog";

const TodoItem = (props: Props) => {
  const { index, todoItem } = props;
  const hook = useTodoItem(props);
  return (
    <>
      <AtomCard css={itemCardStyle(todoItem.status)} raised>
        <Box css={narrowWidthStyle}>No. {index}</Box>

        <Box css={narrowWidthStyle}>
          <AtomCheckbox
            checked={hook.todoStatus === 1}
            onChange={hook.onChangeHandler.statusCheckbox}
            color="default"
            title="Done / Not done"
          />
        </Box>

        <Box css={narrowWidthStyle}>
          <AtomIconButton onClick={hook.onClickHandler.editIcon} title="Edit">
            <Edit sx={{ padding: 0 }} />
          </AtomIconButton>
        </Box>

        <Box css={nameStyle}>{todoItem.name}</Box>

        <Box css={mediumWidthStyle}>
          {DateTimeUtils.getDateTimeStr(todoItem.startAt)}
        </Box>

        <Box css={mediumWidthStyle}>
          {DateTimeUtils.getDateTimeStr(todoItem.endAt)}
        </Box>

        <Box css={narrowWidthStyle}>{hook.getTypeStr(todoItem.type)}</Box>

        <Box css={narrowWidthStyle}>
          <AtomIconButton
            onClick={hook.onClickHandler.deleteIcon}
            title="Delete"
          >
            <Delete sx={{ padding: 0 }} />
          </AtomIconButton>
        </Box>
      </AtomCard>

      <AtomDialog
        title="Edit Todo"
        onClose={hook.onCloseHandler.todoItemDialog}
        open={hook.isTodoItemDialogOpen}
      >
        <TodoEdit
          displayMode={1}
          todoItem={todoItem}
          callback={hook.onCloseHandler.todoItemDialog}
        />
      </AtomDialog>

      <MoleculeConfirmDialog
        message="Are you sure you want to delete the todo?"
        onClose={hook.onCloseHandler.deleteConfirmDialog}
        onOkClick={() => hook.onClickHandler.deleteOk(todoItem.id)}
        open={hook.isDeleteConfirmDialogOpen}
      />
    </>
  );
};

const itemCardStyle = (status: number) =>
  css({
    margin: "0.2em",
    padding: "0.5em",
    minWidth: "800px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: status === 1 ? "#eeeeee  " : "inherit",
  });

const narrowWidthStyle = css({ minWidth: "50px", margin: "0 0.5rem" });
const mediumWidthStyle = css({ minWidth: "150px", margin: "0 0.5rem" });
const nameStyle = css({
  minWidth: "400px",
  flexGrow: 1,
  textAlign: "left",
  margin: "0 0.5rem",
});

export default React.memo(TodoItem);
