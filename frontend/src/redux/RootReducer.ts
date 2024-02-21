import { combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
const rootReducer = combineReducers({
  home: homeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
