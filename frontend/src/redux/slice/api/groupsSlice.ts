import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import {
  GroupDetailsResponse,
  GroupResponse,
  NewGroupResponse,
  UpdateGroupBody,
} from "@/Types";

export const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    groupsCreated: builder.query<GroupResponse, string>({
      query: (query: string) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.GET_USER_GROUPS_ORGANIZER}${query}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
      providesTags: ["Groups"],
    }),
    groupDetails: builder.query<GroupDetailsResponse, string>({
      query: (groupName: string) => {
        if (groupName !== "") {
          return {
            url: `${API_ENDPOINTS.GROUP}${Endpoints.GROUP_DETAILS}?name=${groupName}`,
            method: "GET",
            keepUnusedDataFor: 5,
          };
        }
      },
      providesTags: ["Groups"],
    }),
    createGroup: builder.mutation<NewGroupResponse, FormData>({
      query: (body) => ({
        url: `${API_ENDPOINTS.GROUP}${Endpoints.CREATE_GROUP}`,
        method: "POST",
        body,
        formData: true,
        keepUnusedDataFor: 5,
      }),
      invalidatesTags: ["Groups"],
    }),
    editGroup: builder.mutation<NewGroupResponse, UpdateGroupBody>({
      query: ({ body, groupId }) => ({
        url: `${API_ENDPOINTS.GROUP}${Endpoints.UPDATE_GROUP}/${groupId}`,
        method: "PUT",
        body,
        formData: true,
        keepUnusedDataFor: 5,
      }),
      invalidatesTags: ["Groups"],
    }),
    eventsInGroup: builder.query<GroupDetailsResponse, string>({
      query: (groupId: string) => ({
        url: `${API_ENDPOINTS.GROUP}${Endpoints.GET_EVENTS_IN_GROUP}?groupId=${groupId}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
      providesTags: ["Groups"],
    }),
  }),
});
export const {
  useGroupsCreatedQuery,
  useGroupDetailsQuery,
  useCreateGroupMutation,
  useEditGroupMutation,
  useEventsInGroupQuery,
} = groupsApiSlice;
