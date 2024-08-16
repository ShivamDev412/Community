import { EventsState } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: EventsState = {

  eventDetails: {
    id: "",
    name: "",
    details: "",
    event_date: "",
    event_time: "",
    event_end_time: "",
    event_type: "",
    category_id: "",
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
      id: "",
    },
    group: {
      group_id: "",
      name: "",
      image: "",
      location: "",
      group_type: "",
    },
  },
  hostingPageNumber: 1,
  attendingPageNumber: 1,
  pastPageNumber: 1,
};

const userEventsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
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
    },
  },
});

export const {
  setHostingPageNumber,
  setAttendingPageNumber,
  setPastPageNumber,
  setEventDetails,
} = userEventsSlice.actions;
export default userEventsSlice.reducer;
