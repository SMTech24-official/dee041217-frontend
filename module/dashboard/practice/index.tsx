"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X, Divide, Play, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import group from "@/assets/images/Group.svg";
import group1 from "@/assets/images/Group (1).svg";
import group2 from "@/assets/images/Group (2).svg";
import group3 from "@/assets/images/Group (3).svg";

interface Question {
  id: number;
  type: "visual" | "word";
  question: string;
  visual?: {
    operation: string;
    num1: number;
    num2: number;
  };
  options: { label: string; value: number }[];
  correct: number;
}

const additionQuestions: Question[] = [
  {
    id: 1,
    type: "visual",
    question: "",
    visual: { operation: "+", num1: 5, num2: 5 },
    options: [
      { label: "A", value: 5 },
      { label: "B", value: 12 },
      { label: "C", value: 10 },
      { label: "D", value: 15 },
    ],
    correct: 10,
  },
  {
    id: 2,
    type: "word",
    question:
      "Tom has 5 apples. He buys 3 more. How many apples does he have now?",
    options: [
      { label: "A", value: 5 },
      { label: "B", value: 12 },
      { label: "C", value: 8 },
      { label: "D", value: 15 },
    ],
    correct: 8,
  },
];

export default function PracticeComponent() {
  const [currentView, setCurrentView] = useState<"menu" | "quiz">("menu");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questions] = useState<Question[]>(additionQuestions);

  const categories = [
    {
      id: "addition",
      title: "Addition",
      description:
        "Boost Your Kid's Math Skills with Fun Addition Quizzes and More!",
      icon: group,
      color: "from-cyan-50 to-cyan-50",
      iconBg: "bg-cyan-500",
      playColor: "text-cyan-500",
      shadowColor: "#06b6d4", // cyan-500
    },
    {
      id: "subtraction",
      title: "Subtraction",
      description:
        "Master Subtraction and More with Fun, Interactive Math Quizzes!",
      icon: group1,
      color: "from-orange-50 to-red-50",
      iconBg: "bg-red-500",
      playColor: "text-red-500",
      shadowColor: "#ef4444", // red-500
    },
    {
      id: "multiplication",
      title: "Multiplication",
      description:
        "Supercharge Your Kid's Multiplication Skills with Fun and Engaging Quizzes!",
      icon: group2,
      color: "from-amber-50 to-orange-50",
      iconBg: "bg-orange-500",
      playColor: "text-orange-500",
      shadowColor: "#f97316", // orange-500
    },
    {
      id: "division",
      title: "Division",
      description: "Make Division Fun and Easy with Engaging Math Quizzes!",
      icon: group3,
      color: "from-emerald-50 to-green-50",
      iconBg: "bg-green-500",
      playColor: "text-green-500",
      shadowColor: "#22c55e", // green-500
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView("quiz");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      setCurrentView("menu");
      setSelectedAnswer(null);
      setCurrentQuestion(0);
    }
  };

  const handleBackToMenu = () => {
    setCurrentView("menu");
    setSelectedAnswer(null);
    setCurrentQuestion(0);
  };

  if (currentView === "quiz") {
    const question = questions[currentQuestion];

    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="w-md mx-auto ">
          {/* Quiz Card */}
          <div className="bg-white rounded-3xl shadow-2xl mb-6">
            <div className="p-0">
              {/* Question Header */}
              <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-t-3xl p-6 text-white">
                {question.type === "visual" && question.visual ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="bg-white/20 rounded-full p-4 border-4 border-white/30">
                      <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                        {question.visual.num1}
                      </div>
                    </div>
                    <div className="text-4xl font-bold">+</div>
                    <div className="bg-white/20 rounded-full p-4 border-4 border-white/30">
                      <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                        {question.visual.num2}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-lg font-medium leading-relaxed">
                    {question.question}
                  </p>
                )}
              </div>

              {/* Answer Options */}
              <div className="p-6 space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.value)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                      selectedAnswer === option.value
                        ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-lg"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">{option.label}</span>
                      <span className="font-semibold">
                        {option.value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option.value
                          ? "border-white bg-white"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswer === option.value && (
                        <Check className="w-4 h-4 text-cyan-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Back to Menu */}
          <Button
            onClick={handleBackToMenu}
            variant="ghost"
            className="w-full mt-4 text-white hover:bg-white/10"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-7/12 mx-auto p-5 ">
      <div className="space-y-6">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className={`bg-gradient-to-r ${category.color} border-0 transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden hover:brightness-110`}
              onClick={() => handleCategorySelect(category.id)}
              style={{
                boxShadow: `0 6px 0 0 ${category.shadowColor}`,
              }}
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={category.icon}
                    alt="icon"
                    width={50}
                    height={50}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-black leading-relaxed max-w-md">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className={`${category.playColor}`}>
                  <Play className="h-8 w-8 fill-current" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
