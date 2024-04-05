import { GroupsSliceType } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupsSliceType = {
  groupsCreated: [],
  groupsInMember: [],
  groupDetails: {
    about: "",
    created_at: "",
    group_id: "",
    group_type: "",
    image: "",
    compressed_image:"",
    location: "",
    membersCount: 0,
    members: [],
    name: "",
    organized_by: {
      name: "",
      image: "",
      compressed_image: "",
      id: "",
    },
    updated_at: "",
  },
  groupEvents: {
    events: [],
    pageNumber: 1,
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
    setGroupEvents: (state, action) => {
      state.groupEvents = action.payload;
    },
  },
});

export const {
  setGroupsCreated,
  setGroupsInMember,
  setPageNumberCreated,
  setPageNumberInMember,
  clearGroups,
  setGroupDetails,
  setGroupEvents,
} = groupsSlice.actions;
export default groupsSlice.reducer;
