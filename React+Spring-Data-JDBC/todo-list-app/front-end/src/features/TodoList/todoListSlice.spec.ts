import todoListReducer, {
  TodoListState,
  resetTodoListSlice,
  setAllTodos,
  upsertOneTodo,
  updateOneTodo,
} from "./todoListSlice";

describe("todo list reducer", () => {
  const initialTodo = {
    id: "1",
    name: "Jest Test Task 1",
    type: 2,
    status: 0,
    startAt: "2023-01-01 00:00:00",
    endAt: "2023-01-31 18:30:00",
  };
  const initialState: TodoListState = {
    todoList: {
      ids: [1],
      entities: {
        1: initialTodo,
      },
    },
  };
  it("should handle reset state", () => {
    const actual = todoListReducer(initialState, resetTodoListSlice());
    expect(actual.todoList.entities).toEqual({});
  });

  it("should handle insert by upsertOneTodo", () => {
    const newTodo = {
      id: "2",
      name: "Jest Test Task 2",
      type: 1,
      status: 0,
      startAt: "2023-02-01 09:00:00",
      endAt: "2023-02-28 20:30:00",
    };
    const actual = todoListReducer(initialState, upsertOneTodo(newTodo));
    expect(actual.todoList.entities).toEqual({ 1: initialTodo, 2: newTodo });
  });

  it("should handle update by upsertOneTodo", () => {
    const newTodo = {
      id: "1",
      name: "Jest Test Task 1",
      type: 2,
      status: 1, // Changed from 0 to 1
      startAt: "2023-01-01 00:00:00",
      endAt: "2023-01-31 18:30:00",
    };
    const actual = todoListReducer(initialState, upsertOneTodo(newTodo));
    expect(actual.todoList.entities).toEqual({
      1: { ...initialTodo, status: 1 },
    });
  });

  it("should handle update by updateOneTodo", () => {
    const newTodo = {
      id: "1",
      name: "[New] Jest Test Task 1 Renamed", // Added "[New]"
      type: 2,
      status: 0,
      startAt: "2023-01-01 00:00:00",
      endAt: "2023-01-31 18:30:00",
    };
    const actual = todoListReducer(initialState, updateOneTodo(newTodo));
    expect(actual.todoList.entities[1]?.name).toEqual(
      "[New] Jest Test Task 1 Renamed"
    );
  });

  it("should handle setAllTodos", () => {
    const actual = todoListReducer(
      { todoList: { ids: [], entities: {} } },
      setAllTodos([initialTodo])
    );
    expect(actual.todoList.entities[1]).toEqual(initialTodo);
  });
});
