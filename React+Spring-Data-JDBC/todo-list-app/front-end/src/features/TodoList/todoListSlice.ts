import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  Dispatch,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import TodoListApi, { TTodo } from "./todoListApi";

export interface TodoListState {
  todoList: EntityState<TTodo>;
}

const todosAdapter = createEntityAdapter<TTodo>({
  // selectId: (todo) => todo.id,
});
export const todosSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todoListSlice.todoList
);

const initialState: TodoListState = {
  todoList: todosAdapter.getInitialState(),
};

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};

export const getAllTodos = createAsyncThunk<
  /** Return type of the payload creator */
  TTodo[],
  /** First argument to the payload creator */
  object,
  AsyncThunkConfig
>("todoList/getAllTodos", async (_, thunkApi) => {
  try {
    const response = await TodoListApi.getAll();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMsg(error));
  }
});

export const createTodo = createAsyncThunk<
  /** Return type of the payload creator */
  unknown,
  /** First argument to the payload creator */
  TTodo,
  AsyncThunkConfig
>("todoList/createTodo", async (todo, thunkApi) => {
  try {
    const response = await TodoListApi.create(todo);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMsg(error));
  }
});

export const updateTodo = createAsyncThunk<
  /** Return type of the payload creator */
  unknown,
  /** First argument to the payload creator */
  TTodo,
  AsyncThunkConfig
>("todoList/updateTodo", async (todo, thunkApi) => {
  try {
    const response = await TodoListApi.update(todo, todo.id);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMsg(error));
  }
});

export const deleteTodo = createAsyncThunk<
  /** Return type of the payload creator */
  unknown,
  /** First argument to the payload creator */
  string,
  AsyncThunkConfig
>("todoList/deleteTodo", async (id, thunkApi) => {
  try {
    const response = await TodoListApi.delete(id);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMsg(error));
  }
});

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    resetTodoListSlice: () => initialState,
    setAllTodos: (state, action: PayloadAction<TTodo[]>) => {
      todosAdapter.setAll(state.todoList, action.payload);
    },
    upsertOneTodo: (state, action: PayloadAction<TTodo>) => {
      todosAdapter.upsertOne(state.todoList, action.payload);
    },
    updateOneTodo: (state, action: PayloadAction<TTodo>) => {
      todosAdapter.updateOne(state.todoList, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      todosAdapter.setAll(state.todoList, action.payload);
    });
  },
});

export const getErrorMsg = (error: unknown): string => {
  return error instanceof Error ? error.message : "Unknown Error";
};

export const { resetTodoListSlice, setAllTodos, upsertOneTodo, updateOneTodo } =
  todoListSlice.actions;

export const todoListSliceSelector = (state: RootState) => state.todoListSlice;

export default todoListSlice.reducer;
