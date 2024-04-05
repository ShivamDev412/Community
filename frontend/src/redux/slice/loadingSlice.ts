import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  skeletonLoading: false,
};
const loadingSlice = createSlice({
  name: "loadingState",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSkeletonLoading: (state, action) => {
      state.skeletonLoading = action.payload;
    }
  },
});
export const { setLoading,setSkeletonLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
