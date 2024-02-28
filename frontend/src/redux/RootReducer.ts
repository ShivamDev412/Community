import { combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
import userSlice from "./slice/userSlice";
import loadingSlice from "./slice/loadingSlice";
const rootReducer = combineReducers({
  home: homeSlice,
  user: userSlice,
  loading: loadingSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
