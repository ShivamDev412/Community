import { UserType } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState:UserType = {
  id: "",
  name: "",
  email: "",
  location: "",
  joined_on: "",
  image: "",
  compressed_image:"",
  bio: "",
  dob: "",
  sex: "",
  looking_for:[],
  life_state:[],
  interests:[],
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
    setUserInterest(state, action) {
      state.interests = action.payload;
    },
    clearUser() {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser, clearUser, setLocation, setUserInterest } = userSlice.actions;
export default userSlice.reducer;
