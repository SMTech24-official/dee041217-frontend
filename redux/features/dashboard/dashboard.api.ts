import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    overView: builder.query({
      query: () => ({
        url: "/dashboard/admin",
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

    myProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
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

export const { useOverViewQuery, useAllUserQuery, useMyProfileQuery, useBlockUserMutation } =
  dashboardApi;
