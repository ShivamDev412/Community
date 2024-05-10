import { SearchPageType } from "@/Types";
import {
  Distances,
  HomeEvents,
  SearchCategory,
  SearchDay,
} from "@/utils/Constant";
// import { Distances, HomeEvents } from "@/utils/Constant";
import { createSlice } from "@reduxjs/toolkit";
const initialState: SearchPageType = {
  search: {
    keyword: "",
    day: SearchDay[0],
    distance: Distances[0],
    type: HomeEvents[0],
    category: SearchCategory[0],
    sortBy: "date",
    lat: 0,
    lon: 0,
    tab: "events",
  },
  events: [],
  groups: [],
};
const searchSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      return {
        ...state,
        search: action.payload,
      };
    },
    setEvents: (state, action) => {
      return {
        ...state,
        events: action.payload,
      };
    },
    setGroups: (state, action) => {
      return {
        ...state,
        groups: action.payload,
      };
    },
    clearEvents: (state) => {
      return {
        ...state,
        events: [],
      };
    },
    clearGroups: (state) => {
      return {
        ...state,
        groups: [],
      };
    },
    clearSearch: (state) => {
      return {
        ...state,
        search: {
          keyword: "",
          day: SearchDay[0],
          distance: Distances[0],
          type: HomeEvents[0],
          category: SearchCategory[0],
          sortBy: "date",
          lat: 0,
          lon: 0,
          tab: "events",
        },
      };
    },
    changeTab: (state, action) => {
      return {
        ...state,
        search: {
          ...state.search,
          tab: action.payload,
        },
      };
    },
  },
});
export const {
  setSearch,
  clearSearch,
  setEvents,
  setGroups,
  clearGroups,
  clearEvents,
  changeTab,
} = searchSlice.actions;
export default searchSlice.reducer;
