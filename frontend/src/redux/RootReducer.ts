import { combineReducers } from "@reduxjs/toolkit";
 import homeSlice from "./slice/homeSlice";
import userSlice from "./slice/userSlice";
const rootReducer = combineReducers({
  home: homeSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
