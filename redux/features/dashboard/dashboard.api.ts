import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/type/globalType";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    overView: builder.query({
      query: () => ({
        url: "/users/user/count",
        method: "GET",
      }),
    }),

    allUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),



    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useOverViewQuery, useAllUserQuery, useBlockUserMutation } =
  dashboardApi;
