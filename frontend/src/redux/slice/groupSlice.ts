import { GroupsSliceType } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupsSliceType = {
  groupsCreated: [],
  groupsInMember: [],
  groupDetails:{
    about: "",
    created_at: "",
    group_id: "",
    group_type: "",
    image: "",
    location: "",
    members: [],
    name: "",
    organized_by: {
      name: ""
    },
    updated_at: "",
  },
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
    setGroupDetails: (state, action) => {
      state.groupDetails = action.payload;
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
  setGroupDetails
} = groupsSlice.actions;
export default groupsSlice.reducer;
