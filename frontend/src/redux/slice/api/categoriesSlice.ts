import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import { CategoriesResponse } from "@/Types";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query<CategoriesResponse, string>({
      query: () => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.CATEGORIES}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
      providesTags: ["Categories"],
    }),
  }),
});
export const { useCategoriesQuery } = categoriesApiSlice;
