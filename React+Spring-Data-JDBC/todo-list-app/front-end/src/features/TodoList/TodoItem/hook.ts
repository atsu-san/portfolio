import React, { useEffect, useState } from "react";
import { TTodo } from "../todoListApi";
import { TODO_TYPE_LIST } from "../../../constants/constants";
import { useAppDispatch } from "../../../app/hooks";
import { deleteTodo, getAllTodos, updateTodo } from "../todoListSlice";
import { openSnackbar } from "../../../atomic/atoms/AtomSnackbar/atomSnackbar";

export type Props = {
  index: number;
  todoItem: TTodo;
};

const useTodoItem = (props: Props) => {
  const { todoItem } = props;
  const dispatch = useAppDispatch();
  const [todoStatus, setTodoStatus] = useState(props.todoItem.status);
  const [isTodoItemDialogOpen, setIsTodoItemDialogOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);

  useEffect(() => {
    setTodoStatus(props.todoItem.status);
  }, [props.todoItem.status]);

  const onChangeHandler = {
    statusCheckbox: async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTodoStatus = e.target.checked ? 1 : 0;
      setTodoStatus(newTodoStatus);
      const resultAction = await dispatch(
        updateTodo({ ...todoItem, status: newTodoStatus })
      );
      if (updateTodo.fulfilled.match(resultAction)) {
        dispatch(getAllTodos({}));
      }
    },
  };

  const onClickHandler = {
    editIcon: () => setIsTodoItemDialogOpen(true),
    deleteIcon: () => setIsDeleteConfirmDialogOpen(true),
    deleteOk: async (id: string) => {
      const resultAction = await dispatch(deleteTodo(id));
      if (deleteTodo.fulfilled.match(resultAction)) {
        setIsDeleteConfirmDialogOpen(false);
        dispatch(getAllTodos({}));
        dispatch(openSnackbar("Todo deleted."));
      }
    },
  };

  const onCloseHandler = {
    deleteConfirmDialog: () => setIsDeleteConfirmDialogOpen(false),
    todoItemDialog: () => setIsTodoItemDialogOpen(false),
  };

  const getTypeStr = (typeNum: number): string => {
    return TODO_TYPE_LIST.find((item) => item.id === typeNum)?.option ?? "";
  };

  return {
    onCloseHandler,
    onChangeHandler,
    onClickHandler,
    isTodoItemDialogOpen,
    isDeleteConfirmDialogOpen,
    getTypeStr,
    todoStatus,
  };
};

export default useTodoItem;
