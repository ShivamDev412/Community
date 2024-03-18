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
  user: {},
  groups: {},
  events: {},
  intrusts: {},
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
        events: action.payload.events,
      };
    },
    setIntrusts: (state, action) => {
      return {
        ...state,
        intrusts: action.payload.intrusts,
      };
    },
    clearState: () => initialState, // Clear the state when the user logs out
    clearUser: () => initialState, // Clear the user state when the user logs out
  },
});
export const { setLocation, setCoord } = homeSlice.actions;
export default homeSlice.reducer;
