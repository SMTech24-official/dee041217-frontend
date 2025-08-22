import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/type/globalType";

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    mathQuestions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/math-mission-questions",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Question"],
    }),

    addMathQuestion: builder.mutation({
      query: (data) => ({
        url: "/math-mission-questions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Question"],
    }),

    updateMathQuestion: builder.mutation({
      query: (args) => ({
        url: `/math-mission-questions/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Question"],
    }),

    deleteMathQuestion: builder.mutation({
      query: (id) => ({
        url: `/math-mission-questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

    timeQuestions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/time-challenge-questions",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["TimeQuestion"],
    }),

    addTimeQuestion: builder.mutation({
      query: (data) => ({
        url: "/time-challenge-questions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TimeQuestion"],
    }),

    updateTimeQuestion: builder.mutation({
      query: (args) => ({
        url: `/time-challenge-questions/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["TimeQuestion"],
    }),

    deleteTimeQuestion: builder.mutation({
      query: (id) => ({
        url: `/time-challenge-questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TimeQuestion"],
    }),

    dailyQuestions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/practice-questions",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["DailyQuestion"],
    }),

    addDailyQuestion: builder.mutation({
      query: (data) => ({
        url: "/practice-questions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DailyQuestion"],
    }),

    updateDailyQuestion: builder.mutation({
      query: (args) => ({
        url: `/practice-questions/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["DailyQuestion"],
    }),

    deleteDailyQuestion: builder.mutation({
      query: (id) => ({
        url: `/practice-questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DailyQuestion"],
    }),
  }),
});

export const {
  useMathQuestionsQuery,
  useAddMathQuestionMutation,
  useUpdateMathQuestionMutation,
  useDeleteMathQuestionMutation,
  useTimeQuestionsQuery,
  useAddTimeQuestionMutation,
  useUpdateTimeQuestionMutation,
  useDeleteTimeQuestionMutation,
  useDailyQuestionsQuery,
  useAddDailyQuestionMutation,
  useUpdateDailyQuestionMutation,
  useDeleteDailyQuestionMutation,
} = questionApi;
