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
  user: {},
  groups: {},
  events: {},
  rsvpEvents: [],
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
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
      };
    },
    setGroups: (state, action) => {
      return {
        ...state,
        groups: action.payload.groups,
      };
    },
    setEvents: (state, action) => {
      return {
        ...state,
        events: action.payload,
      };
    },
    setRsvpEvents: (state, action) => {
      return {
        ...state,
        rsvpEvents: action.payload,
      };
    },
    clearHomeState: (state) => {
      return { ...state, ...initialState };
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
  clearHomeState,
  setEvents,
  setFilters,
  resetFilters,
  setRsvpEvents,
} = homeSlice.actions;
export default homeSlice.reducer;
