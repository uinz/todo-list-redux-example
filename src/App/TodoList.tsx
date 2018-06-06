import classnames from "classnames";
import React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/todos";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  isAllActive: boolean;
  numberOfCompleted: number;
  numberOfLeft: number;
  numberOfTodos: number;
  clearCompletedTodos: typeof actions.clearCompletedTodos.action;
  toggleAllTodo: typeof actions.toggleAllTodo.action;
  getTodos: typeof actions.getTodos.action;
}

class TodoList extends React.Component<Props> {
  public state = {
    filter: "all",
  };

  public componentDidMount() {
    this.props.getTodos();
  }

  public render() {
    const {
      numberOfCompleted, numberOfLeft,
      numberOfTodos, isAllActive, toggleAllTodo,
      clearCompletedTodos,
    } = this.props;
    let { todos } = this.props;

    if (this.state.filter !== "all") {
      todos = todos.filter((todo) => todo.status === this.state.filter);
    }

    return (
      <section className="main">
        {numberOfTodos > 0 &&
          <>
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              checked={isAllActive}
              onChange={() => toggleAllTodo()}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        }

        <ul className="todo-list">
          {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </ul>

        <footer className="footer">
          <span className="todo-count"><strong>{numberOfLeft}</strong> item left</span>
          <ul className="filters">
            {
              ["all", "active", "completed"].map(status => (
                <li key={status}>
                  <a onClick={() => this.setFilter(status)}
                    style={{ textTransform: "uppercase", cursor: "pointer" }}
                    className={classnames({ selected: this.state.filter === status })}>{status}</a>
                </li>
              ))
            }
          </ul>
          {numberOfCompleted > 0 &&
            <button onClick={() => clearCompletedTodos()}
              className="clear-completed">Clear completed</button>
          }
        </footer>
      </section>
    );
  }

  private setFilter = (filter: string) => {
    this.setState({ filter });
  }
}

function mapState({ todos }: { todos: Todo[] }) {
  return {
    isAllActive: todos.length > 0 && todos.every((todo) => todo.status === "completed"),
    numberOfCompleted: todos.filter((todo) => todo.status === "completed").length,
    numberOfLeft: todos.filter((todo) => todo.status === "active").length,
    numberOfTodos: todos.length,
    todos,
  };
}

function mapDispatch(dispatch: Dispatch) {
  return {
    clearCompletedTodos: bindActionCreators(actions.clearCompletedTodos.action, dispatch),
    getTodos: bindActionCreators(actions.getTodos.action, dispatch),
    toggleAllTodo: bindActionCreators(actions.toggleAllTodo.action, dispatch),
  };
}

export default connect(mapState, mapDispatch)(TodoList);
