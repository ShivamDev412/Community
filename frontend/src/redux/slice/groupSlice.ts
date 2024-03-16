import { GroupsSliceType } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupsSliceType = {
  groupsCreated: [],
  groupsInMember: [],
  pageNumberCreated: 1,
  pageNumberInMember: 1,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroupsCreated: (state, action) => {
      state.groupsCreated = action.payload;
    },
    setGroupsInMember: (state, action) => {
      state.groupsInMember = action.payload;
    },
    setPageNumberCreated: (state, action) => {
      state.pageNumberCreated = action.payload;
    },
    setPageNumberInMember: (state, action) => {
      state.pageNumberInMember = action.payload;
    },
    clearGroups: (state) => {
      state.groupsCreated = initialState.groupsCreated;
      state.groupsInMember = initialState.groupsInMember;
      state.pageNumberCreated = initialState.pageNumberCreated;
      state.pageNumberInMember = initialState.pageNumberInMember;
    },
  },
});

export const {
  setGroupsCreated,
  setGroupsInMember,
  setPageNumberCreated,
  setPageNumberInMember,
  clearGroups,
} = groupsSlice.actions;
export default groupsSlice.reducer;
