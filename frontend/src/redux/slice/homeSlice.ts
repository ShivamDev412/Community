import { Distances, HomeEvents } from "@/utils/Constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {
    city: "",
    state: "",
  },
  coord: {
    lat: 0,
    lon: 0,
  },
  filters: {
    distance: Distances[0],
    type: HomeEvents[0],
  },
  user: {},
  groups: {},
  events: {},
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
    setCoord: (state, action) => {
      return {
        ...state,
        coord: {
          ...state.coord,
          lat: action.payload.lat,
          lon: action.payload.lon,
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
  setCoord,
  clearHomeState,
  setEvents,
  setFilters,
  resetFilters,
} = homeSlice.actions;
export default homeSlice.reducer;
