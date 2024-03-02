import { GroupsSliceType } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupsSliceType = {
  groupsCreated: [],
  groupsInMember: [],
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
    clearGroups: (state) => {
      (state.groupsCreated = initialState.groupsCreated),
        (state.groupsInMember = initialState.groupsInMember);
    },
  },
});

export const { setGroupsCreated, setGroupsInMember, clearGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
