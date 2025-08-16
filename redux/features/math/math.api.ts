import baseApi from "@/redux/api/baseApi";

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

    submitResult: builder.mutation({
      query: (data) => ({
        url: `/math-mission-players`,
        method: "POST",
        body: data,
      }),
    }),

    timeMission: builder.query({
      query: () => ({
        url: "/time-challenge",
        method: "GET",
      }),
    }),

    singleTimeMission: builder.query({
      query: (id) => ({
        url: `/time-challenge/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMathMissionQuery,
  useSingleMathMissionQuery,
  useSubmitResultMutation,
  useTimeMissionQuery,
  useSingleTimeMissionQuery
} = mathApi;
