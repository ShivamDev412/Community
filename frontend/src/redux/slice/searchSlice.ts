import { SearchType } from "@/Types";
import {
  Distances,
  HomeEvents,
  SearchCategory,
  SearchDay,
} from "@/utils/Constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SearchType = {
  keyword: "",
  day: SearchDay[0],
  distance: Distances[0],
  type: HomeEvents[0],
  category: SearchCategory[0],
  sortBy: "date",
  lat: 0,
  lon: 0,
  tab: "events",
};
const searchSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearSearch: () => {
      return initialState;
    },
    changeTab: (state, action) => {
      return {
        ...state,
        tab: action.payload,
      };
    },
  },
});
export const { setSearch, clearSearch, changeTab } = searchSlice.actions;
export default searchSlice.reducer;
