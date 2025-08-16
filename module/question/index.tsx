"use client";

import Spinner from "@/components/common/Spinner";
import { Progress } from "@/components/ui/progress";
import {
  useSingleMathMissionQuery,
  useSingleTimeMissionQuery,
  useSubmitResultMutation,
} from "@/redux/features/math/math.api";
import { Check, X, Loader } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";

interface MathMissionQuestion {
  id: string;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
  point: number;
}

function QuestionComponent() {
  const { question } = useParams<{ question: string }>();
  const { time_challenges } = useParams<{ question: string }>();
  const pathname = usePathname();
  const challengeType = pathname?.includes("timed_challenges");
  const [time, setTime] = useState<number>(180);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const [submitResult] = useSubmitResultMutation();

  const { data, isFetching } = useSingleMathMissionQuery(question, {
    skip: !question || challengeType,
  });

  const { data: timeData, isFetching: timeFetching } =
    useSingleTimeMissionQuery(time_challenges, {
      skip: !time_challenges || !challengeType,
    });

  const questions: MathMissionQuestion[] = challengeType
    ? timeData?.data?.timeChallengeQuestions || []
    : data?.data?.mathMissionQuestions || [];

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;
  console.log(timeData);

  useEffect(() => {
    if (!challengeType) return;
    const id = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [challengeType]);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m} : ${s}`;
  };

  const handleAnswer = (option: string) => {
    if (!answers[currentIndex]) {
      setSelectedAnswer(option);
      setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedAnswer(answers[prevIndex] || null);
    }
  };

  const calculateResult = () => {
    let totalPoints = 0,
      totalCorrect = 0,
      totalIncorrect = 0,
      totalSkipped = 0;

    questions.forEach((q, idx) => {
      const given = answers[idx];
      if (!given) totalSkipped++;
      else if (given === q.correctAnswer) {
        totalCorrect++;
        totalPoints += q.point;
      } else totalIncorrect++;
    });

    return {
      mathMissionId: question,
      totalPoints,
      totalCorrect,
      totalSkipped,
      totalIncorrect,
    };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = calculateResult();
    const res = await submitResult({ ...result }).unwrap();

    if (res) {
      setIsLoading(false);
      setResult(result);
      setOpen(true);
      toast.success("Question submitted successfully");
    }
  };

  if (isFetching || timeFetching) return <Spinner />;
  if (!questions.length) return <p>No questions found.</p>;

  return (
    <>
      <div className="max-w-xl mx-auto flex items-center justify-center flex-col gap-5">
        {/* Timer */}
        {challengeType && (
          <div className="flex items-center justify-center w-full gap-5">
            <p className=" whitespace-nowrap font-semibold bg-gradient-to-b from-[#1DE5B1] to-[#1BA570] p-3 rounded text-2xl w-full text-center">
              {formatTime(time)}
            </p>
            <button
              onClick={handleSubmit}
              className="w-16 h-14 flex items-center justify-center rounded-full bg-white hover:bg-red-500 hover:text-white cursor-pointer transition duration-300 text-black"
            >
              <X />
            </button>
          </div>
        )}

        {/* Question Card */}
        <div className="p-6 bg-white rounded-lg shadow-md w-full">
          <div className="flex items-center justify-between gap-2">
            <p className=" text-blue-500 whitespace-nowrap font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <Progress
              value={(currentIndex / questions.length) * 100}
              className="text-[#36d1dc]"
            />
          </div>

          <h2 className="text-xl font-semibold mb-4 p-2 bg-gradient-to-b from-[#36d1dc] to-[#1e90b7] min-h-36 mt-5 flex items-center justify-center rounded-2xl text-white text-center">
            Question {currentIndex + 1}: {currentQuestion?.title}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {[
              currentQuestion.option1,
              currentQuestion.option2,
              currentQuestion.option3,
              currentQuestion.option4,
            ].map((option, index) => {
              const userAnswer = answers[currentIndex];
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === userAnswer;

              let optionClasses =
                "bg-gradient-to-b from-[#36d1dc]/10 to-[#1e90b7]/10 text-black hover:from-[#36d1dc] hover:to-[#1e90b7]";
              if (userAnswer) {
                if (isCorrect) optionClasses = "bg-green-500 text-white";
                else if (isSelected) optionClasses = "bg-red-500 text-white";
              } else if (isSelected) {
                optionClasses =
                  "bg-gradient-to-b from-[#36d1dc] to-[#1e90b7] text-white";
              }

              return (
                <div
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`flex items-center justify-between rounded-xl p-5 cursor-pointer transition-all duration-300 ${optionClasses}`}
                >
                  <span className="font-medium mr-2 text-[#1e90b7] bg-white w-12 h-12 flex items-center justify-center rounded text-2xl">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span
                    className={
                      userAnswer && isCorrect
                        ? "text-white text-2xl font-semibold"
                        : "text-black text-2xl font-semibold"
                    }
                  >
                    {option}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      userAnswer ? "border-white" : "border-gray-600"
                    }`}
                  >
                    {userAnswer && isCorrect && (
                      <Check className="w-6 h-6 text-white" />
                    )}
                    {userAnswer && isSelected && !isCorrect && (
                      <X className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={isFirst}
                className={`mt-4 px-4 py-5 rounded-xl transition duration-300 flex-1 ${
                  isFirst
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : " bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                }`}
              >
                Previous
              </button>

              <button
                onClick={() =>
                  isLast ? handleSubmit() : setCurrentIndex(currentIndex + 1)
                }
                disabled={!answers[currentIndex] || isLoading}
                className={`mt-4 px-4 py-5 rounded-xl transition duration-300 flex-1 ${
                  !answers[currentIndex]
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-b from-[#1DE5B1] to-[#1BA570] hover:from-[#1DE5B1] hover:to-[#1BA570] text-white cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="w-6 h-6 animate-spin" />
                    Loading...
                  </span>
                ) : isLast ? (
                  "Submit"
                ) : (
                  "Next →"
                )}
              </button>
            </div>
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

            <div className="mt-6 flex justify-center">
              <Dialog.Close asChild>
                <button className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default QuestionComponent;
