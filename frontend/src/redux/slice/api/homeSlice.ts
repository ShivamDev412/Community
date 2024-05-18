import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import { HomeEventsResponse, RSVPEventsResponse } from "@/Types";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    events: builder.query<HomeEventsResponse, string>({
      query: (params: string) => ({
        url: `${API_ENDPOINTS.HOME}${Endpoints.GET_EVENTS}${params}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
    }),
    rsvpEvents: builder.query<RSVPEventsResponse, string>({
      query: () => ({
        url: `${API_ENDPOINTS.HOME}${Endpoints.RSVP_EVENTS}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
    }),
    getCity: builder.mutation<{city: number, state: number}, { lat: number; lon: number }>({
      query: (params) => ({
        url: `${API_ENDPOINTS.HOME}${Endpoints.GET_CITY}`,
        method: "POST",
        body: params,
      }),
    }),
    search: builder.query<HomeEventsResponse, string>({
      query: (params: string) => ({
        url: `${API_ENDPOINTS.HOME}${Endpoints.SEARCH_EVENTS}${params}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});
export const { useEventsQuery, useRsvpEventsQuery, useGetCityMutation, useLazySearchQuery } = homeApiSlice;
