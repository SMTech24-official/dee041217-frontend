import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/type/globalType";

export const mathApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    mathMission: builder.query({
      query: () => ({
        url: "/math-mission",
        method: "GET",
      }),
    }),

    singleMathMission: builder.query({
      query: (id) => ({
        url: `/math-mission/${id}`,
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

export const { useMathMissionQuery, useSingleMathMissionQuery } = mathApi;
