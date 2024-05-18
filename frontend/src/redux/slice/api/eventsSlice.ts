import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import { EventType, NewEventResponse, UpdateEventBody } from "@/Types";
type UserEventResponse = {
  success: boolean;
  data: EventType[];
};
export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userEvents: builder.query<UserEventResponse, string>({
      query: (params: string) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.USER_EVENTS}${params}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
      providesTags: ["Events"],
    }),
    eventDetails: builder.query<NewEventResponse, string>({
      query: (eventId: string) => ({
        url: `${API_ENDPOINTS.EVENT}${Endpoints.EVENTS_DETAILS}/${eventId}`,
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    createEvent: builder.mutation<NewEventResponse, FormData>({
      query: (body) => ({
        url: `${API_ENDPOINTS.EVENT}${Endpoints.CREATE_EVENT}`,
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation<NewEventResponse, UpdateEventBody>({
      query: ({body, eventId}) => ({
        url: `${API_ENDPOINTS.EVENT}${Endpoints.UPDATE_EVENT}/${eventId}`,
        method: "PUT",
        body,
        formData: true,
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});
export const {
  useUserEventsQuery,
  useEventDetailsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
} = eventsApiSlice;
