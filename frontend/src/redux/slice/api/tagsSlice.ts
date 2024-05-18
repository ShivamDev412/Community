import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import { TagsResponse } from "@/Types";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tags: builder.query<TagsResponse, string>({
      query: (categoryId: string) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.INTERESTS}/${categoryId}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
    }),
    userTags: builder.query<TagsResponse, string>({
      query: () => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.GET_USER_INTERESTS}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
      providesTags: ["Tags"],
    }),
    addTag: builder.mutation<TagsResponse, { interestId: string }>({
      query: (body) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.ADD_INTERESTS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tags"],
    }),
    deleteTag: builder.mutation<TagsResponse, string>({
      query: (tagId: string) => ({
        url: `${API_ENDPOINTS.USER}${Endpoints.DELETE_INTERESTS}/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});
export const {
  useLazyTagsQuery,
  useTagsQuery,
  useUserTagsQuery,
  useAddTagMutation,
  useDeleteTagMutation,
} = categoriesApiSlice;
