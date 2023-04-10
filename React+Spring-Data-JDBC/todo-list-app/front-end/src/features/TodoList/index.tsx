/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, Typography, css } from "@mui/material";
import useTodoList from "./hook";
import AtomDialog from "../../atomic/atoms/AtomDialog";
import AtomButton from "../../atomic/atoms/AtomButton";
import TodoItem from "./TodoItem";
import TodoEdit from "./TodoEdit";
import { AddTask } from "@mui/icons-material";

const index = () => {
  const hook = useTodoList();

  return (
    <Box css={containerStyle}>
      <Typography variant="h1">Todo List</Typography>
      <Box>
        <Typography variant="h6">
          {`Hello ${process.env.REACT_APP_USER_NAME ?? "Guest"}!`}
        </Typography>
      </Box>
      <Box my={2}>
        {hook.todos.map((item, i) => (
          <TodoItem
            key={i}
            index={++i}
            todoItem={{
              id: item.id,
              name: item.name,
              type: item.type,
              status: item.status,
              startAt: item.startAt,
              endAt: item.endAt,
            }}
          />
        ))}
      </Box>

      <Box>
        <AtomButton
          onClick={hook.onClickHandler.newTodoBtn}
          startIcon={<AddTask />}
          width="wide"
        >
          New Todo
        </AtomButton>
      </Box>

      <AtomDialog
        title="New Todo"
        onClose={hook.onCloseHandler.newTodoDialog}
        open={hook.isDialogOpen}
      >
        <TodoEdit
          displayMode={0}
          todoItem={null}
          callback={hook.onCloseHandler.newTodoDialog}
        />
      </AtomDialog>
    </Box>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default index;
