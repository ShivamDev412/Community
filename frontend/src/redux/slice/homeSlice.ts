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
const userSlice = createSlice({
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
export const { setLocation } = userSlice.actions;
export default userSlice.reducer;
