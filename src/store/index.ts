import { applyMiddleware, compose, createStore } from "redux";
import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";

// for redux chrome extension
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxLogger, reduxThunk),
);

export function configrationStore(preloadedState = {}) {
  return createStore(reducers, preloadedState, enhancer);
}
