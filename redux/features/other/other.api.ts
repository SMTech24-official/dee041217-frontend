import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/type/globalType";

export const mathApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allTopic: builder.query({
      query: () => ({
        url: "/auth/topics",
        method: "GET",
      }),
    }),

    topicQuestion: builder.query({
      query: (topicId) => ({
        url: `/practice-questions/topic/${topicId}`,
        method: "GET",
      }),
    }),

    leaderBoard: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/auth/leaderboard",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),

    userReport: builder.query({
      query: () => ({
        url: `/users/report`,
        method: "GET",
      }),
    }),

    avatars: builder.query({
      query: () => ({
        url: `/auth/avatars`,
        method: "GET",
      }),
    }),

    randomQuestion: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/practice-questions/random",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useAllTopicQuery,
  useTopicQuestionQuery,
  useLeaderBoardQuery,
  useUserReportQuery,
  useAvatarsQuery,
  useRandomQuestionQuery,
} = mathApi;
