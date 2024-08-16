import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import { AuthResponse, LoginType, ResetPasswordType } from "@/Types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginType>({
      query: (data) => ({
        url: `${API_ENDPOINTS.AUTH}${Endpoints.LOGIN}`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<AuthResponse, FormData>({
      query: (data) => ({
        url: `${API_ENDPOINTS.AUTH}${Endpoints.SIGNUP}`,
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordType>({
      query: (data) => ({
        url: `${API_ENDPOINTS.AUTH}${Endpoints.RESET_PASSWORD}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation, useSignupMutation, useResetPasswordMutation } =
  authApiSlice;
