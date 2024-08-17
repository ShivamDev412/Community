import { HomeDataType } from "@/Types";
import { Distances, HomeEvents } from "@/utils/Constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HomeDataType = {
  location: {
    city: "",
    state: "",
  },
  filters: {
    distance: Distances[0],
    type: HomeEvents[0],
  },
};
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      return {
        ...state,
        location: {
          ...state.location,
          city: action.payload.location.city,
          state: action.payload.location.state,
        },
      };
    },
    setFilters: (state, action) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          distance: action.payload.distance,
          type: action.payload.type,
        },
      };
    },
    resetFilters: (state) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          distance: Distances[0],
          type: HomeEvents[0],
        },
      };
    },
  },
});
export const {
  setLocation,
  setFilters,
  resetFilters,
  
} = homeSlice.actions;
export default homeSlice.reducer;
