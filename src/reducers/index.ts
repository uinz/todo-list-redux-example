import { combineReducers } from "redux";
import todos, { TodosState } from "./todos";

export default combineReducers({
  todos,
});

export interface RootState {
  todos: TodosState;
}
