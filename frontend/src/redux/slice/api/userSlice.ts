import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import {
  DefaultResponseType,
  PersonalInfoResponse,
  PersonalInfoType,
  UserResponse,
} from "@/Types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query<UserResponse, string>({
      query: () => ({
        url: `${API_ENDPOINTS.USER}/`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
      providesTags: ["User"],
    }),
    registerToEvent: builder.mutation<DefaultResponseType, string>({
      query: (eventId: string) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.REGISTER_TO_EVENT}`,
        method: "POST",
        body: { eventId },
      }),
      invalidatesTags: ["Events", "RSVP_EVENTS"],
    }),
    updateUserPersonalInfo: builder.mutation<
      PersonalInfoResponse,
      PersonalInfoType
    >({
      query: (data) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.UPDATE_PERSONAL_INFO}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    editProfile: builder.mutation<PersonalInfoResponse, FormData>({
      query: (data) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.EDIT_PROFILE}`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),
    logOut: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.LOGOUT}`,
        method: "POST",
      }),
    }),
    cancelEventRSVP: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      string
    >({
      query: (eventId: string) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.CANCEL_RSVP}`,
        method: "POST",
        body: { eventId },
      }),
      invalidatesTags: ["Events", "RSVP_EVENTS"],
    }),
    forgotPassword: builder.mutation<DefaultResponseType, { email: string }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.AUTH}${Endpoints.FORGOT_PASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<
      DefaultResponseType,
      { currentPassword: string; newPassword: string; confirmPassword: string }
    >({
      query: (data) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.CHANGE_PASSWORD}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useUserQuery,
  useRegisterToEventMutation,
  useUpdateUserPersonalInfoMutation,
  useEditProfileMutation,
  useLogOutMutation,
  useCancelEventRSVPMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = userApiSlice;
