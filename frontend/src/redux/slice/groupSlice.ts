import { GroupsSliceType } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupsSliceType = {
  groupDetails: {
    about: "",
    created_at: "",
    id: "",
    group_type: "",
    image: "",
    compressed_image:"",
    location: "",
    latitude: 0,
    longitude: 0,
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
    pageNumber: 1,
  },
  pageNumberCreated: 1,
  pageNumberInMember: 1,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
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
      state.pageNumberInMember = initialState.pageNumberInMember;
    },
    setGroupEvents: (state, action) => {
      state.groupEvents = action.payload;
    },
  },
});

export const {
  setPageNumberCreated,
  setPageNumberInMember,
  clearGroups,
  setGroupDetails,
  setGroupEvents,
} = groupsSlice.actions;
export default groupsSlice.reducer;
