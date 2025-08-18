"use client";
import { Progress } from "@/components/ui/progress";
import { Check, Loader, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import addition from "@/assets/icons/addition.png";
import subtraction from "@/assets/icons/subtraction.png";
import multiplication from "@/assets/icons/multiplication.png";
import division from "@/assets/icons/division.png";
import addition_1 from "@/assets/icons/addition_1.png";
import subtraction_1 from "@/assets/icons/subtraction_2.png";
import multiplication_1 from "@/assets/icons/multiplication_3.png";
import division_1 from "@/assets/icons/division_4.png";
import Image from "next/image";
import { useTopicQuestionQuery } from "@/redux/features/other/other.api";
import * as Dialog from "@radix-ui/react-dialog";
import Spinner from "@/components/common/Spinner";

function PracticeQuestion({ type }: { type: string }) {
  const challengeType = useSearchParams().get("name");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<number, string>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const { data, isFetching } = useTopicQuestionQuery(type, { skip: !type });
  const questions = data?.data?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

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

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      const previousAnswer = answeredQuestions[newIndex] || null;
      setCurrentQuestionIndex(newIndex);
      setSelectedAnswer(previousAnswer);
    }
  };

  const handleSubmitQuestion = () => {
    // Save the current selected answer
    if (selectedAnswer) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer,
      }));
    }

    // Calculate result
    let totalCorrect = 0,
      totalIncorrect = 0,
      totalSkipped = 0,
      totalPoints = 0;

    questions.forEach((q: any, idx: number) => {
      const answer =
        idx === currentQuestionIndex ? selectedAnswer : answeredQuestions[idx];
      if (!answer) totalSkipped++;
      else if (answer === q.correctAnswer) {
        totalCorrect++;
        totalPoints += q.point || 1;
      } else totalIncorrect++;
    });

    setResult({ totalCorrect, totalIncorrect, totalSkipped, totalPoints });
    setOpen(true);
  };

  const handleChallengeType = (challengeType: string) => {
    switch (challengeType) {
      case "Addition":
        return "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-500";
      case "Subtraction":
        return "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-500";
      case "Multiplication":
        return "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500";
      case "Division":
        return "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const handleChallengeTypeHover = (challengeType: string) => {
    switch (challengeType) {
      case "Addition":
        return "from-cyan-50 to-cyan-50 hover:from-cyan-500 hover:to-cyan-600";
      case "Subtraction":
        return "from-orange-50 to-red-50 hover:from-orange-500 hover:to-red-600";
      case "Multiplication":
        return "from-yellow-50 to-yellow-50 hover:from-yellow-500 hover:to-yellow-600";
      case "Division":
        return "from-emerald-50 to-emerald-50 hover:from-emerald-500 hover:to-emerald-600";
      default:
        return "from-gray-50 to-gray-100";
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (questions?.length < 1) {
    return (
      <p className="text-white text-2xl font-bold text-center my-12">No Data Found</p>
    );
  }

  return (
    <div className="max-w-xl mx-auto h-full flex items-center justify-center flex-col gap-5">
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

        {/* Question Section */}
        <div
          className={`text-xl font-semibold mb-4 p-2 bg-gradient-to-b ${handleChallengeType(
            challengeType!
          )} min-h-36 mt-5 rounded-2xl text-white text-center `}
        >
          <div className="flex items-center justify-center gap-10 h-36">
            <div className="relative">
              <Image
                src={
                  challengeType! === "Addition"
                    ? addition
                    : challengeType! === "Subtraction"
                    ? subtraction
                    : challengeType! === "Multiplication"
                    ? multiplication
                    : division
                }
                alt="icon"
                width={100}
                height={100}
              />
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                {currentQuestion?.firstNumber}
              </h1>
            </div>
            <Image
              src={
                challengeType === "Addition"
                  ? addition_1
                  : challengeType === "Subtraction"
                  ? subtraction_1
                  : challengeType === "Multiplication"
                  ? multiplication_1
                  : division_1
              }
              alt="icon"
              width={40}
              height={40}
            />
            <div className="relative">
              <Image
                src={
                  challengeType === "Addition"
                    ? addition
                    : challengeType === "Subtraction"
                    ? subtraction
                    : challengeType === "Multiplication"
                    ? multiplication
                    : division
                }
                alt="icon"
                width={100}
                height={100}
              />
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                {currentQuestion?.secondNumber}
              </h1>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {[
            currentQuestion?.option1,
            currentQuestion?.option2,
            currentQuestion?.option3,
            currentQuestion?.option4,
          ].map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isAnswered =
              answeredQuestions[currentQuestionIndex] || selectedAnswer;
            const isCorrect = currentQuestion?.correctAnswer === option;

            let optionClasses = `bg-gradient-to-b text-black ${handleChallengeTypeHover(
              challengeType!
            )}`;

            if (isAnswered) {
              if (isCorrect) optionClasses = "bg-green-500 text-white";
              else if (isSelected && !isCorrect)
                optionClasses = "bg-red-500 text-white";
            }

            return (
              <div
                key={index}
                onClick={() =>
                  !answeredQuestions[currentQuestionIndex] &&
                  setSelectedAnswer(option!)
                }
                className={`flex items-center justify-between rounded-xl p-2 md:p-5 cursor-pointer transition-all duration-300 ${optionClasses}`}
              >
                <span className="font-medium mr-2 text-[#1e90b7] bg-white w-12 h-12 flex items-center justify-center rounded text-2xl">
                  {String.fromCharCode(65 + index)}
                </span>
                <span
                  className={
                    isAnswered && isCorrect
                      ? "text-white text-2xl font-semibold"
                      : "text-black text-2xl font-semibold"
                  }
                >
                  {option}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    isAnswered ? "border-white" : "border-gray-600"
                  }`}
                >
                  {isAnswered &&
                    (isCorrect ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : isSelected && !isCorrect ? (
                      <X className="w-6 h-6 text-white" />
                    ) : null)}
                </div>
              </div>
            );
          })}

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className={`mt-4 px-4 py-5 rounded-xl transition duration-300 flex-1 ${
                isFirstQuestion
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : `bg-gradient-to-b ${handleChallengeType(
                      challengeType!
                    )} text-white`
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (isLastQuestion) handleSubmitQuestion();
                else handleNext();
              }}
              disabled={!selectedAnswer || isLoading}
              className={`mt-4 px-4 py-5 rounded-xl transition duration-300 flex-1 ${
                !selectedAnswer
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : `bg-gradient-to-b ${handleChallengeType(
                      challengeType!
                    )} text-white cursor-pointer`
              }`}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : isLastQuestion ? (
                "Submit Quiz"
              ) : (
                "Next →"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Result Popup */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6">
            <Dialog.Title className="text-2xl font-bold text-center mb-4">
              Quiz Results
            </Dialog.Title>
            {result && (
              <div className="space-y-2 text-center">
                <p className="text-lg">✅ Correct: {result.totalCorrect}</p>
                <p className="text-lg">❌ Incorrect: {result.totalIncorrect}</p>
                <p className="text-lg">⏭️ Skipped: {result.totalSkipped}</p>
                <p className="text-lg font-semibold text-green-600">
                  🏆 Points: {result.totalPoints}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-center gap-3">
              <Dialog.Close asChild>
                <button className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                  Close
                </button>
              </Dialog.Close>

              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setAnsweredQuestions({});
                  setResult(null);
                  setOpen(false);
                }}
                className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl"
              >
                Restart
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default PracticeQuestion;
