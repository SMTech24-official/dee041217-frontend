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
  }),
});

export const {
  useMathQuestionsQuery,
  useAddMathQuestionMutation,
  useUpdateMathQuestionMutation,
  useDeleteMathQuestionMutation,
} = questionApi;
