import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "../actions/todos";

export type TodosState = Todo[];

const reducer = reducerWithInitialState<TodosState>([]);

reducer.case(actions.getTodos.async.done,
  (prevState, { result }) => [...result, ...prevState],
);

reducer.case(actions.addTodo.async.done,
  (prevState, { result }) => [result, ...prevState],
);

reducer.case(actions.deleteTodo.async.done,
  (prevState, { result }) => prevState.filter(todo => todo.id !== result),
);

reducer.case(actions.editTodo.async.done,
  (prevState, { result }) => produce(prevState, nextState => {
    const todo = nextState.find(x => x.id === result.id);
    if (todo) {
      todo.title = result.title;
      todo.status = result.status;
    }
  }),
);

reducer.case(actions.toggleAllTodo.async.done,
  (prevState, { result }) => produce(prevState, nextState => {
    nextState.forEach(todo => {
      todo.status = result;
    });
  }),
);

reducer.case(actions.clearCompletedTodos.async.done,
  (prevState) => prevState.filter(todo => todo.status === "active"),
);

export default reducer;
