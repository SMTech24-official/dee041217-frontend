"use client";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Check, Loader, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import addition from "@/assets/icons/addition.png";
import subtraction from "@/assets/icons/subtraction.png";
import multiplication from "@/assets/icons/multiplication.png";
import division from "@/assets/icons/division.png";
import addition_1 from "@/assets/icons/addition_1.png";
import subtraction_1 from "@/assets/icons/subtraction_2.png";
import multiplication_1 from "@/assets/icons/multiplication_3.png";
import division_1 from "@/assets/icons/division_4.png";
import Image from "next/image";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

function PracticeQuestion({ type }: { type: string }) {
  const [challenge, setChallenge] = useState<boolean>(false);
  const pathname = usePathname();
  const challengeType = pathname?.includes("addition")
    ? "addition"
    : pathname?.includes("subtraction")
    ? "subtraction"
    : pathname?.includes("multiplication")
    ? "multiplication"
    : pathname?.includes("division")
    ? "division"
    : "";

  console.log(type);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<number, string>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleChallengeType = (challengeType: string) => {
    if (challengeType === "addition") {
      return "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-500";
    } else if (challengeType === "subtraction") {
      return "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-500";
    } else if (challengeType === "multiplication") {
      return "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500";
    } else if (challengeType === "division") {
      return "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500";
    }
  };
  const handleChallengeTypeHover = (challengeType: string) => {
    if (challengeType === "addition") {
      return "from-cyan-50 to-cyan-50 hover:from-cyan-500 hover:to-cyan-600";
    } else if (challengeType === "subtraction") {
      return "from-orange-50 to-red-50 hover:from-orange-500 hover:to-red-600";
    } else if (challengeType === "multiplication") {
      return "from-yellow-50 to-yellow-50 hover:from-yellow-500 hover:to-yellow-600";
    } else if (challengeType === "division") {
      return "from-emerald-50 to-emerald-50 hover:from-emerald-500 hover:to-emerald-600";
    }
  };

  return (
    <div className="max-w-xl mx-auto h-full flex items-center justify-center flex-col gap-5">
      <div className="p-6 bg-white rounded-lg shadow-md w-full">
        <div>
          <Switch
            checked={challenge}
            onCheckedChange={() => setChallenge(!challenge)}
            aria-readonly
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className=" text-blue-500 whitespace-nowrap font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <Progress
            value={(currentQuestionIndex / questions.length) * 100}
            className="text-[#36d1dc]"
          />
        </div>

        <div
          className={`text-xl font-semibold mb-4 p-2 bg-gradient-to-b ${handleChallengeType(
            challengeType
          )} min-h-36 mt-5 rounded-2xl text-white text-center `}
        >
          {challenge ? (
            <div className="flex items-center justify-center gap-10 h-36">
              <div className="relative">
                <Image
                  src={
                    challengeType === "addition"
                      ? addition
                      : challengeType === "subtraction"
                      ? subtraction
                      : challengeType === "multiplication"
                      ? multiplication
                      : division
                  }
                  alt="icon"
                  width={100}
                  height={100}
                />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">3</h1>
              </div>
              <Image
                src={
                  challengeType === "addition"
                    ? addition_1
                    : challengeType === "subtraction"
                    ? subtraction_1
                    : challengeType === "multiplication"
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
                    challengeType === "addition"
                      ? addition
                      : challengeType === "subtraction"
                      ? subtraction
                      : challengeType === "multiplication"
                      ? multiplication
                      : division
                  }
                  alt="icon"
                  width={100}
                  height={100}
                />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">3</h1>
              </div>
            </div>
          ) : (
            <h1 className="text-center h-36 flex items-center justify-center">
              Question {currentQuestionIndex + 1}: {currentQuestion?.question}
            </h1>
          )}
        </div>

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
                className={`flex items-center justify-between rounded-xl p-2 md:p-5 cursor-pointer transition-all duration-300 ${
                  showAsSelected
                    ? `bg-gradient-to-b ${handleChallengeType(
                        challengeType
                      )} text-white`
                    : `bg-gradient-to-b  text-black ${handleChallengeTypeHover(
                        challengeType
                      )}`
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
                  : `bg-gradient-to-b ${handleChallengeType(
                      challengeType
                    )} text-white`
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
                  : `bg-gradient-to-b ${handleChallengeType(
                      challengeType
                    )} text-white cursor-pointer`
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

export default PracticeQuestion;
