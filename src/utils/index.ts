import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { RootState } from "../reducers";

export const createAction = actionCreatorFactory();
export const createAsyncAction = asyncFactory<RootState>(createAction);

export * from "redux";
export { bindThunkAction } from "typescript-fsa-redux-thunk";
