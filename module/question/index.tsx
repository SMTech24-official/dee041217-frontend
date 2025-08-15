"use client";
import Spinner from "@/components/common/Spinner";
import { Progress } from "@/components/ui/progress";
import { useSingleMathMissionQuery } from "@/redux/features/math/math.api";
import { Check, Loader, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

function QuestionComponent() {
  const { question } = useParams<{ question: string }>();
  const pathname = usePathname();
  const challengeType = pathname?.includes("timed_challenges");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState<number>(180);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<number, string>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, isFetching } = useSingleMathMissionQuery(question, {
    skip: !question,
  });
  console.log(data?.data?.mathMissionQuestions);
  const questions: Question[] = [
    {
      question:
        "Tom has 5 apples. He buys 3 more. How many apples does he have now?",
      options: ["05", "12", "08", "15"],
      correctAnswer: "08",
    },
    {
      question:
        "Sarah has 7 pencils. She gives 2 to her friend. How many pencils remain?",
      options: ["05", "09", "14", "03"],
      correctAnswer: "05",
    },
    {
      question:
        "There are 6 birds on a tree. 4 more birds join them. How many birds are there now?",
      options: ["02", "10", "06", "24"],
      correctAnswer: "10",
    },
    {
      question: "A box contains 9 chocolates. If you eat 3, how many are left?",
      options: ["12", "06", "03", "27"],
      correctAnswer: "06",
    },
    {
      question:
        "If you have 4 cookies and get 5 more, how many cookies do you have?",
      options: ["01", "09", "20", "45"],
      correctAnswer: "09",
    },
    {
      question:
        "There are 8 students in a class. 3 more join. How many students now?",
      options: ["05", "11", "24", "38"],
      correctAnswer: "11",
    },
  ];

  const handleNext = () => {
    if (selectedAnswer) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer,
      }));
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;

      const previousAnswer = answeredQuestions[newIndex] || null;

      const updatedAnswers = { ...answeredQuestions };
      delete updatedAnswers[newIndex];

      setAnsweredQuestions(updatedAnswers);
      setCurrentQuestionIndex(newIndex);
      setSelectedAnswer(previousAnswer);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleSubmitQuestion = () => {
    setIsLoading(true);
    console.log(answeredQuestions);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentQuestionIndex(0);
      setAnsweredQuestions({});
      setSelectedAnswer(null);
      toast.success("Question submitted successfully");
    }, 2000);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        clearInterval(id);
        return 0;
      });
    }, 1000);

    setTimerId(id); // Save interval ID
    return () => clearInterval(id); // Clear on unmount
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m} : ${s}`;
  };

  const handleSetCurrentQuestionIndex = () => {
    setIsLoading(true);
    console.log(answeredQuestions);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentQuestionIndex(0);
      setAnsweredQuestions({});
      setSelectedAnswer(null);
      toast.success("Question submitted successfully");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto flex items-center justify-center flex-col gap-5">
      {challengeType && (
        <div className="flex items-center justify-center w-full gap-5">
          <p className=" whitespace-nowrap font-semibold bg-gradient-to-b from-[#1DE5B1] to-[#1BA570] hover:from-[#1DE5B1] hover:to-[#1BA570] p-3 rounded text-2xl w-full text-center">
            {formatTime(time)}
          </p>
          <button
            onClick={handleSetCurrentQuestionIndex}
            className="w-16 h-14 flex items-center justify-center rounded-full bg-white hover:bg-red-500 hover:text-white cursor-pointer transition duration-300 text-black"
          >
            <X />
          </button>
        </div>
      )}
      <div className="p-6 bg-white rounded-lg shadow-md w-full">
        <div className="flex items-center justify-between gap-2">
          <p className=" text-blue-500 whitespace-nowrap font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <Progress
            value={(currentQuestionIndex / questions.length) * 100}
            className="text-[#36d1dc]"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4 p-2 bg-gradient-to-b from-[#36d1dc] to-[#1e90b7] min-h-36 mt-5 flex items-center justify-center rounded-2xl text-white text-center">
          Question {currentQuestionIndex + 1}: {currentQuestion?.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isPreviouslyAnswered =
              answeredQuestions[currentQuestionIndex] === option;
            const showAsSelected = isSelected || isPreviouslyAnswered;

            return (
              <div
                key={index}
                onClick={() =>
                  !answeredQuestions[currentQuestionIndex] &&
                  setSelectedAnswer(option)
                }
                className={`flex items-center justify-between rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                  showAsSelected
                    ? "bg-gradient-to-b from-[#36d1dc] to-[#1e90b7] text-white"
                    : "bg-gradient-to-b from-[#36d1dc]/10 to-[#1e90b7]/10 text-black hover:from-[#36d1dc] hover:to-[#1e90b7]"
                }`}
              >
                <span
                  className={`font-medium mr-2 text-[#1e90b7] bg-white w-12 h-12 flex items-center justify-center rounded text-2xl`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={showAsSelected ? "text-white" : "text-black"}>
                  {option}
                </span>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? " bg-green-500 hover:bg-green-600"
                      : "bg-blue-50 border-blue-500"
                  }`}
                >
                  {isSelected && <Check className="w-6 h-6" />}
                </div>
              </div>
            );
          })}

          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className={`mt-4 px-4 py-5 rounded-xl transition duration-300 flex-1 ${
                isFirstQuestion
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : " bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (isLastQuestion) {
                  handleSubmitQuestion();
                } else {
                  handleNext();
                }
              }}
              disabled={!selectedAnswer || isLoading}
              className={`mt-4 px-4 py-5 rounded-xl transition duration-300 flex-1 ${
                !selectedAnswer
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#1DE5B1] to-[#1BA570] hover:from-[#1DE5B1] hover:to-[#1BA570] text-white cursor-pointer"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-6 h-6 animate-spin" />
                  Loading...
                </span>
              ) : isLastQuestion ? (
                "Quiz Completed"
              ) : (
                "Next →"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionComponent;
