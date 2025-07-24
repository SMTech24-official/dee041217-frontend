"use client"

import { Plus, Minus, X, Divide } from "lucide-react"

export default function ProgressReportComponent() {
  const subjects = [
    {
      name: "Addition",
      icon: Plus,
      correct: 100,
      skipped: 50,
      incorrect: 150,
      iconBg: "bg-blue-100",
    },
    {
      name: "Subtraction",
      icon: Minus,
      correct: 100,
      skipped: 50,
      incorrect: 150,
      iconBg: "bg-pink-100",
    },
    {
      name: "Multiplication",
      icon: X,
      correct: 100,
      skipped: 50,
      incorrect: 150,
      iconBg: "bg-yellow-100",
    },
    {
      name: "Division",
      icon: Divide,
      correct: 100,
      skipped: 50,
      incorrect: 150,
      iconBg: "bg-teal-100",
    },
  ]

  const getProgressWidth = (value: number, total: number) => {
    return (value / total) * 100
  }

  const handleChallengeType = (challengeType: string) => {
    if (challengeType === "Addition") {
      return "from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-50";
    } else if (challengeType === "Subtraction") {
      return "from-orange-50 to-red-100 hover:from-orange-100 hover:to-red-50";
    } else if (challengeType === "Multiplication") {
      return "from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-50";
    } else if (challengeType === "Division") {
      return "from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-50";
    }
  };
  return (
    <div className="relative w-full md:w-7/12 mx-auto p-5 md:h-[calc(100vh-100px)] flex items-center justify-center flex-col gap-5 md:gap-10">
      <div className="relative z-10 p-6 space-y-6 w-full">
        {subjects.map((subject, index) => {
          const total = subject.correct + subject.skipped + subject.incorrect
          const correctWidth = getProgressWidth(subject.correct, total)
          const skippedWidth = getProgressWidth(subject.skipped, total)
          const incorrectWidth = getProgressWidth(subject.incorrect, total)

          return (
            <div key={subject.name} className={`bg-gradient-to-b ${handleChallengeType(subject.name)} backdrop-blur-sm rounded-3xl p-6 w-full shadow-[0_6px_0_0_rgba(34,197,94,0.5)]`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center`}>
                    <subject.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                  style={{ width: `${correctWidth}%` }}
                />
                <div
                  className="absolute top-0 h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
                  style={{
                    left: `${correctWidth}%`,
                    width: `${skippedWidth}%`,
                  }}
                />
                <div
                  className="absolute top-0 h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
                  style={{
                    left: `${correctWidth + skippedWidth}%`,
                    width: `${incorrectWidth}%`,
                  }}
                />
              </div>

              {/* Legend */}
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-600">{subject.correct} Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-gray-600">{subject.skipped} Skipped</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-gray-600">{subject.incorrect} Incorrect</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
