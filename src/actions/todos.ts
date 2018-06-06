import Axios from "axios";
import { bindActionCreators, createAsyncAction, Dispatch } from "../utils";

Axios.defaults.baseURL = "http://localhost:3030";

export const getTodos = createAsyncAction<void, Todo[]>(
  "GET_TODOS", async () => {
    const res = await Axios.get("/");
    return res.data.reverse();
  },
);

export const editTodo = createAsyncAction<Todo, Todo>(
  "EDIT_TODO", async (todo) => {
    await Axios.patch("/" + todo.id, {
      status: todo.status,
      title: todo.title,
    });
    return todo;
  },
);

export const addTodo = createAsyncAction<{ title: string; status: Status }, Todo>(
  "ADD_TODO", async ({ title, status }) => {
    const res = await Axios.post("/", { title, status });
    return {
      id: res.data.id,
      status,
      title,
    };
  },
);

export const deleteTodo = createAsyncAction<string, string>(
  "DELETE_TODO", async (id) => {
    const res = await Axios.delete("/" + id);
    return id;
  },
);

export const toggleAllTodo = createAsyncAction<void, Status>(
  "TOGGLE_ALL_TODO", async (_, __, getState) => {
    const { todos } = getState();
    const isAllCompleted = todos.every(todo => todo.status === "completed");
    const nextStatus = isAllCompleted ? "active" : "completed";
    const tasks = todos.map(todo => {
      return Axios.patch("/" + todo.id, {
        status: nextStatus,
        title: todo.title,
      });
    });
    await Promise.all(tasks);
    return nextStatus;
  },
);

export const clearCompletedTodos = createAsyncAction<void, void>(
  "CLEAR_COMPLETED_TODOS", async (_, __, getState) => {
    const completedTodoIds = getState().todos
      .filter(todo => todo.status === "completed")
      .map(todo => todo.id);

    const tasks = completedTodoIds.map(id => Axios.delete("/" + id));
    await Promise.all(tasks);
  },
);
