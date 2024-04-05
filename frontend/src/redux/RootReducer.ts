import { combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
import userSlice from "./slice/userSlice";
import loadingSlice from "./slice/loadingSlice";
import groupsSlice from "./slice/groupSlice";
import eventsSlice from "./slice/eventSlice"
const rootReducer = combineReducers({
  home: homeSlice,
  user: userSlice,
  loading: loadingSlice,
  groups: groupsSlice,
  events:eventsSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
