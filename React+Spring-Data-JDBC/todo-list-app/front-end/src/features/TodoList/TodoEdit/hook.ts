import React, { ChangeEvent, useMemo, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createTodo, getAllTodos, updateTodo } from "../todoListSlice";
import { TTodo } from "../todoListApi";
import dayjs from "dayjs";
import { SelectChangeEvent } from "@mui/material";
import { TMenuItem } from "../../../atomic/atoms/AtomSelect";
import { openSnackbar } from "../../../atomic/atoms/AtomSnackbar/atomSnackbar";

export type Props = {
  displayMode: number; // 0 = create mode, 1 = edit mode
  todoItem: null | TTodo; // null = create mode, TTodo = edit mode
  callback: () => void;
};

const useTodoEdit = (props: Props) => {
  const { todoItem } = props;
  const dispatch = useAppDispatch();

  const [name, setName] = useState(todoItem?.name ?? "");
  const [type, setType] = useState(todoItem?.type ?? 0);
  const [status, setStatus] = useState(todoItem?.status ?? 0);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(
    todoItem?.startAt ? dayjs(todoItem.startAt) : null
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(
    todoItem?.endAt ? dayjs(todoItem.endAt) : null
  );
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  const startTimeErrorMsg = useMemo(() => {
    switch (startTimeError) {
      case "maxDate": {
        return "Start time cannot be after End time.";
      }
      case "invalidDate": {
        return "Start time is invalid.";
      }
      default: {
        return "";
      }
    }
  }, [startTimeError]);

  const endTimeErrorMsg = useMemo(() => {
    switch (endTimeError) {
      case "minDate": {
        return "End time cannot be before Start time.";
      }
      case "invalidDate": {
        return "End time is invalid.";
      }
      default: {
        return "";
      }
    }
  }, [endTimeError]);

  const hasError: boolean = startTimeError !== "" || endTimeError !== "";

  const menuItemList: TMenuItem[] = [
    { value: 0, name: "Work" },
    { value: 1, name: "Home" },
    { value: 2, name: "Other" },
  ];

  const onChangeHandler = {
    name: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setName(e.target.value);
    },
    type: (e: SelectChangeEvent<unknown>) => {
      setType(Number(e.target.value));
    },
    startTime: (value: React.SetStateAction<dayjs.Dayjs | null>) => {
      setStartTime(value);
    },
    endTime: (value: React.SetStateAction<dayjs.Dayjs | null>) => {
      setEndTime(value);
    },
    statusRadio: (e: React.ChangeEvent<HTMLInputElement>) => {
      setStatus(Number(e.target.value));
    },
  };

  const onClickHandler = {
    createUpdateBtn: async () => {
      if (hasError) {
        dispatch(openSnackbar(startTimeErrorMsg || endTimeErrorMsg));
        return;
      }

      const todoObj: TTodo = {
        id: todoItem?.id ?? "",
        name,
        startAt: startTime ? startTime.toString() : "",
        endAt: endTime ? endTime.toString() : "",
        type,
        status,
      };
      if (props.displayMode === 0) {
        const resultAction = await dispatch(createTodo(todoObj));
        if (createTodo.fulfilled.match(resultAction)) {
          props.callback();
          dispatch(getAllTodos({}));
        }
      } else if (props.displayMode === 1) {
        const resultAction = await dispatch(updateTodo(todoObj));
        if (updateTodo.fulfilled.match(resultAction)) {
          props.callback();
          dispatch(getAllTodos({}));
        }
      }
    },
  };

  return {
    name,
    startTime,
    endTime,
    type,
    status,
    menuItemList,
    onChangeHandler,
    onClickHandler,
    startTimeError,
    setStartTimeError,
    endTimeError,
    setEndTimeError,
    startTimeErrorMsg,
    endTimeErrorMsg,
  };
};

export default useTodoEdit;
