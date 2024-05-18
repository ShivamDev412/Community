import { RootState } from "@/redux/RootReducer";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  // debugger;
  if (result.error?.status === 403) {
    const response: any = await baseQuery(
      `${API_ENDPOINTS.AUTH}${Endpoints.REFRESH_TOKEN}`,
      api,
      extraOptions
    );

    if (response.data?.success) {
      api.dispatch(setCredentials(response?.data["auth-token"]));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Groups", "Events", "User", "Auth", "Categories", "Tags"],
  endpoints: () => ({}),
});
