import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  name: "",
  email: "",
  location: {
    city: "",
    state: "",
  },
  age: null,
  joined_on: "",
  image: null,
  bio: null,
  dob: null,
  sex: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    clearUser() {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser, clearUser, setLocation } = userSlice.actions;
export default userSlice.reducer;
