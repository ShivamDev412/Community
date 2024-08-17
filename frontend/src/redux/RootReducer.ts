import { UnknownAction, combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
import loadingSlice from "./slice/loadingSlice";
import groupsSlice from "./slice/groupSlice";
import eventsSlice from "./slice/eventSlice";
import authSlice from "./slice/authSlice";
import searchSlice from "./slice/searchSlice";
import { apiSlice } from "./slice/api/apiSlice";
import {
  HomeDataType,
  UserType,
  GroupsSliceType,
  EventsState,
  SearchType,
} from "@/Types";
import { CombinedState } from "@reduxjs/toolkit/query";

const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  home: homeSlice,
  loading: loadingSlice,
  groups: groupsSlice,
  events: eventsSlice,
  search: searchSlice,
});

const rootReducer = (
  state:
    | Partial<{
        api:
          | CombinedState<
              {},
              "Groups" | "Events" | "User" | "Auth" | "Categories" | "Tags",
              "api"
            >
          | undefined;
        auth: { token: null } | undefined;
        home: HomeDataType | undefined;
        user: UserType | undefined;
        loading: { loading: boolean; skeletonLoading: boolean } | undefined;
        groups: GroupsSliceType | undefined;
        events: EventsState | undefined;
        search: SearchType | undefined;
      }>
    | undefined,
  action: UnknownAction
) => {
  if (action.type === "auth/logOut") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
