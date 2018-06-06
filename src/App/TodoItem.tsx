import classnames from "classnames";
import React, { ChangeEvent } from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/todos";

interface Props {
  todo: Todo;
  editTodo: typeof actions.editTodo.action;
  deleteTodo: typeof actions.deleteTodo.action;
}

interface State {
  isEditing: boolean;
}

class TodoItem extends React.Component<Props, State> {
  public state: State = {
    isEditing: false,
  };

  public render() {
    const { todo } = this.props;
    const wrapperClassName = classnames({
      completed: todo.status === "completed",
      editing: this.state.isEditing,
    });
    return (
      <li className={wrapperClassName}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.status === "completed"}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.toggleEdit}>{todo.title}</label>
          <button onClick={this.deleteTodo} className="destroy" />
        </div>
        {this.state.isEditing &&
          <input
            autoFocus
            className="edit"
            value={todo.title}
            onKeyDown={this.handleKeyDown}
            onBlur={this.toggleEdit}
            onChange={this.handleChange}
          />
        }
      </li>
    );
  }

  private handleToggle = () => {
    const { todo } = this.props;
    const status: Status = todo.status === "active"
      ? "completed"
      : "active";

    this.props.editTodo({
      ...todo,
      status,
    });
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.editTodo({
      ...this.props.todo,
      title: event.target.value,
    });
  }

  private toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  }

  private deleteTodo = () => {
    this.props.deleteTodo(this.props.todo.id);
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this.toggleEdit();
    }
  }
}

function mapDispatch(dispatch: Dispatch) {
  return {
    deleteTodo: bindActionCreators(actions.deleteTodo.action, dispatch),
    editTodo: bindActionCreators(actions.editTodo.action, dispatch),
  };
}

export default connect(null, mapDispatch)(TodoItem);
