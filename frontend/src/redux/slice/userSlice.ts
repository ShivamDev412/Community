import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  name: "",
  email: "",
  location: "",
  joined_on: "",
  image: "",
  compressedImage:"",
  bio: "",
  dob: "",
  sex: "",
  looking_for:[],
  life_state:[],
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
