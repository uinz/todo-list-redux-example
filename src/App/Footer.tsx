import React from "react";
class Footer extends React.Component {
  public render() {
    return (
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          <span>Template by </span>
          <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        <p>
          <span>Created by </span>
          <a href="http://uinz.cn">uinz</a>
        </p>
        <p>
          <span>Part of </span>
          <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    );
  }
}

export default Footer;
