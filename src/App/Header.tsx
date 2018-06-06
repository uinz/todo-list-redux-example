import React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/todos";

interface Props {
  addTodo: typeof actions.addTodo.action;
}

interface State {
  value: string;
}

class Header extends React.Component<Props, State> {
  public state: State = { value: "" };
  public handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      if (!this.state.value.trim()) {
        return window.alert("Empty!");
      }

      this.props.addTodo({
        status: "active",
        title: this.state.value,
      });

      this.setState({ value: "" });
    }
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  }

  public render() {
    return (
      <header className="header">
        <h1>TODOS</h1>
        <input
          autoFocus
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          value={this.state.value}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

function mapDispatch(dispatch: Dispatch) {
  return {
    addTodo: bindActionCreators(actions.addTodo.action, dispatch),
  };
}

export default connect(null, mapDispatch)(Header);
