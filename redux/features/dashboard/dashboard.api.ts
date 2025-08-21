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
      query: (args) => ({
        url: `/users/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["User"],
    }),

    // ===============
    // Math mission
    // ==============

    mathMission: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/math-mission",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Mission"],
    }),

    addMathMission: builder.mutation({
      query: (data) => ({
        url: `/math-mission`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mission"],
    }),

    updateMathMission: builder.mutation({
      query: (args) => ({
        url: `/math-mission/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Mission"],
    }),

    deleteMathMission: builder.mutation({
      query: (id) => ({
        url: `/math-mission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mission"],
    }),

    // ===============
    // Time mission
    // ==============
    timeMissions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/time-challenge",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Mission"],
    }),

    addTimeMission: builder.mutation({
      query: (data) => ({
        url: `/time-challenge`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mission"],
    }),

    updateTimeMission: builder.mutation({
      query: (args) => ({
        url: `/time-challenge/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Mission"],
    }),

    deleteTimeMission: builder.mutation({
      query: (id) => ({
        url: `/time-challenge/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mission"],
    }),
  }),
});

export const {
  useOverViewQuery,
  useAllUserQuery,
  useBlockUserMutation,
  useMathMissionQuery,
  useAddMathMissionMutation,
  useUpdateMathMissionMutation,
  useDeleteMathMissionMutation,
  useTimeMissionsQuery,
  useAddTimeMissionMutation,
  useUpdateTimeMissionMutation,
  useDeleteTimeMissionMutation,
} = dashboardApi;
