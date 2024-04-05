import { EventsState } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// dd
const initialState: EventsState = {
  hostingEvents: [],
  attendingEvents: [],
  pastEvents: [],
  eventDetails: {
    event_id: "",
    name: "",
    details: "",
    event_date: "",
    event_time: "",
    event_end_time: "",
    event_type: "",
    link: null,
    address: null,
    tags: [],
    created_at: "",
    image: "",
    compressed_image: "",
    members: [],
    host: {
      name: "",
      image: "",
      user_id: ""
    },
    group: {
      group_id: "",
      name: "",
      image: "",
      location: "",
      group_type: ""
    }
  },
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
    setEventDetails: (state, action: PayloadAction<any>) => {
      state.eventDetails = action.payload;
    }
  },
});

export const {
  setHostingEvents,
  setAttendingEvents,
  setPastEvents,
  setHostingPageNumber,
  setAttendingPageNumber,
  setPastPageNumber,
  setEventDetails
} = userEventsSlice.actions;
export default userEventsSlice.reducer;
