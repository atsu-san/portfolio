import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllTodos,
  resetTodoListSlice,
  todosSelectors,
} from "./todoListSlice";
import { openSnackbar } from "../../atomic/atoms/AtomSnackbar/atomSnackbar";

const useTodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => todosSelectors.selectAll(state));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onClickHandler = {
    newTodoBtn: () => setIsDialogOpen(true),
  };

  const onCloseHandler = {
    newTodoDialog: () => setIsDialogOpen(false),
  };

  const init = async () => {
    const resultAction = await dispatch(getAllTodos({}));
    if (getAllTodos.rejected.match(resultAction)) {
      dispatch(
        openSnackbar(`Failed to retrieve data. Reason: ${resultAction.payload}`)
      );
    }
  };

  useEffect(() => {
    init();
    return () => {
      resetTodoListSlice();
    };
  }, []);

  return {
    todos,
    isDialogOpen,
    onClickHandler,
    onCloseHandler,
  };
};

export default useTodoList;
