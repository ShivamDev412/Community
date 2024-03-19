import { EventsState } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: EventsState = {
  hostingEvents: [],
  attendingEvents: [],
  pastEvents: [],
  hostingPageNumber: 1,
  attendingPageNumber: 1,
  pastPageNumber: 1,
};

const userEventsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setHostingEvents: (state, action: PayloadAction<any[]>) => {
      state.hostingEvents = action.payload;
    },
    setAttendingEvents: (state, action: PayloadAction<any[]>) => {
      state.attendingEvents = action.payload;
    },
    setPastEvents: (state, action: PayloadAction<any[]>) => {
      state.pastEvents = action.payload;
    },
    setHostingPageNumber: (state, action: PayloadAction<number>) => {
      state.hostingPageNumber = action.payload;
    },
    setAttendingPageNumber: (state, action: PayloadAction<number>) => {
      state.attendingPageNumber = action.payload;
    },
    setPastPageNumber: (state, action: PayloadAction<number>) => {
      state.pastPageNumber = action.payload;
    },
  },
});

export const {
  setHostingEvents,
  setAttendingEvents,
  setPastEvents,
  setHostingPageNumber,
  setAttendingPageNumber,
  setPastPageNumber,
} = userEventsSlice.actions;
export default userEventsSlice.reducer;
