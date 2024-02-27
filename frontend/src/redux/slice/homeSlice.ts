import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {
    city: "",
    state: "",
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
  },
});
export const { setLocation } = homeSlice.actions;
export default homeSlice.reducer;
