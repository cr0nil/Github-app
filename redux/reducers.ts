import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user";

const reducers = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
