import { combineReducers } from "redux";
import todoReducer from "../reducers/todoReducer";

const reducers = combineReducers({
  todoState: todoReducer
})

export default reducers;
