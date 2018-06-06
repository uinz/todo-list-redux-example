import React from "react";
import { Provider } from "react-redux";
import { configrationStore } from "../store";

import Footer from "./Footer";
import Header from "./Header";
import TodoList from "./TodoList";

const store = configrationStore();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <>
          <section className="todoapp">
            <Header />
            <TodoList />
          </section>
          <Footer />
        </>
      </Provider>
    );
  }
}

export default App;
