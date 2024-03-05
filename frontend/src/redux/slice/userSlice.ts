import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  name: "",
  email: "",
  location: "",
  age: "",
  joined_on: "",
  image: "",
  bio: "",
  dob: "",
  sex: "",
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
