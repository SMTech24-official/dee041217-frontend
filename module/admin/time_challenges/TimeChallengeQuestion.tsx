"use client";
import { Plus } from "lucide-react";
import AdminButton from "@/components/ui/AdminButton";
import { useState } from "react";
import QuestionsTable from "@/sheard/QuestionsTable";
import { useSearchParams } from "next/navigation";

export type Question = {
  QNo: string;
  Question: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  Answer: string;
  Level: "Easy" | "Medium" | "Hard";
  Type: "Simple" | "Story";
};

function TimeChallengeQuestion({ id }: { id: string }) {
  const challengeName = useSearchParams().get("name");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [questions, setQuestions] = useState<Question[]>([
    {
      QNo: "Q-001",
      Question: "What is 5 + 3?",
      Option1: "6",
      Option2: "8",
      Option3: "9",
      Option4: "7",
      Answer: "8",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-002",
      Question: "Which planet is known as the Red Planet?",
      Option1: "Earth",
      Option2: "Venus",
      Option3: "Mars",
      Option4: "Jupiter",
      Answer: "Mars",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-003",
      Question:
        "Sara has 10 apples. She gives 4 to her friend. How many are left?",
      Option1: "5",
      Option2: "6",
      Option3: "7",
      Option4: "8",
      Answer: "6",
      Level: "Easy",
      Type: "Story",
    },
    {
      QNo: "Q-004",
      Question: "What color do you get by mixing red and blue?",
      Option1: "Green",
      Option2: "Purple",
      Option3: "Orange",
      Option4: "Brown",
      Answer: "Purple",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-005",
      Question: "What is the capital of Bangladesh?",
      Option1: "Chittagong",
      Option2: "Khulna",
      Option3: "Dhaka",
      Option4: "Sylhet",
      Answer: "Dhaka",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-006",
      Question:
        "Lina had 15 pencils. She lost 5. Then bought 3 more. How many pencils now?",
      Option1: "13",
      Option2: "12",
      Option3: "10",
      Option4: "11",
      Answer: "13",
      Level: "Easy",
      Type: "Story",
    },
    {
      QNo: "Q-007",
      Question: "Which of these is a mammal?",
      Option1: "Shark",
      Option2: "Frog",
      Option3: "Dolphin",
      Option4: "Snake",
      Answer: "Dolphin",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-008",
      Question:
        "If a train leaves at 5:00 PM and travels for 3 hours, what time will it arrive?",
      Option1: "8:00 PM",
      Option2: "7:00 PM",
      Option3: "6:00 PM",
      Option4: "9:00 PM",
      Answer: "8:00 PM",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-009",
      Question:
        "Rafi read 25 pages on Monday and 30 pages on Tuesday. How many pages in total?",
      Option1: "55",
      Option2: "50",
      Option3: "45",
      Option4: "60",
      Answer: "55",
      Level: "Medium",
      Type: "Story",
    },
    {
      QNo: "Q-010",
      Question: "Which of these animals can fly?",
      Option1: "Penguin",
      Option2: "Ostrich",
      Option3: "Bat",
      Option4: "Elephant",
      Answer: "Bat",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-011",
      Question:
        "There are 4 baskets. Each has 5 apples. How many apples in total?",
      Option1: "15",
      Option2: "20",
      Option3: "25",
      Option4: "10",
      Answer: "20",
      Level: "Medium",
      Type: "Story",
    },
    {
      QNo: "Q-012",
      Question: "Which gas do humans need to breathe in to survive?",
      Option1: "Carbon dioxide",
      Option2: "Oxygen",
      Option3: "Hydrogen",
      Option4: "Nitrogen",
      Answer: "Oxygen",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-013",
      Question: "If you divide 36 by 6, what do you get?",
      Option1: "5",
      Option2: "6",
      Option3: "7",
      Option4: "8",
      Answer: "6",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-014",
      Question: "What is the square root of 81?",
      Option1: "8",
      Option2: "9",
      Option3: "7",
      Option4: "6",
      Answer: "9",
      Level: "Hard",
      Type: "Simple",
    },
    {
      QNo: "Q-015",
      Question:
        "A bus has 40 seats. 18 people are on it. How many empty seats?",
      Option1: "20",
      Option2: "22",
      Option3: "23",
      Option4: "25",
      Answer: "22",
      Level: "Hard",
      Type: "Story",
    },
    {
      QNo: "Q-016",
      Question: "Which number is a prime number?",
      Option1: "9",
      Option2: "15",
      Option3: "13",
      Option4: "21",
      Answer: "13",
      Level: "Hard",
      Type: "Simple",
    },
    {
      QNo: "Q-017",
      Question:
        "Rehana had $100. She bought a bag for $45 and shoes for $30. What's left?",
      Option1: "25",
      Option2: "20",
      Option3: "30",
      Option4: "35",
      Answer: "25",
      Level: "Hard",
      Type: "Story",
    },
    {
      QNo: "Q-018",
      Question: "What is the largest ocean on Earth?",
      Option1: "Indian",
      Option2: "Arctic",
      Option3: "Pacific",
      Option4: "Atlantic",
      Answer: "Pacific",
      Level: "Hard",
      Type: "Simple",
    },
    {
      QNo: "Q-019",
      Question: "If 1 box has 12 eggs, how many eggs in 6 boxes?",
      Option1: "72",
      Option2: "60",
      Option3: "66",
      Option4: "70",
      Answer: "72",
      Level: "Hard",
      Type: "Story",
    },
    {
      QNo: "Q-020",
      Question: "Which planet has rings around it?",
      Option1: "Venus",
      Option2: "Earth",
      Option3: "Mars",
      Option4: "Saturn",
      Answer: "Saturn",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-021",
      Question: "What is the main ingredient in bread?",
      Option1: "Rice",
      Option2: "Flour",
      Option3: "Sugar",
      Option4: "Salt",
      Answer: "Flour",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-022",
      Question:
        "Ali had 6 chocolates. He gave 2 to his sister. How many does he have now?",
      Option1: "4",
      Option2: "3",
      Option3: "5",
      Option4: "2",
      Answer: "4",
      Level: "Easy",
      Type: "Story",
    },
    {
      QNo: "Q-023",
      Question: "Which month has 28 or 29 days?",
      Option1: "January",
      Option2: "February",
      Option3: "March",
      Option4: "April",
      Answer: "February",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-024",
      Question: "What is 7 × 6?",
      Option1: "42",
      Option2: "36",
      Option3: "48",
      Option4: "40",
      Answer: "42",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-025",
      Question: "What do plants need for photosynthesis?",
      Option1: "Water, Oxygen, Sunlight",
      Option2: "Sunlight, Carbon Dioxide, Water",
      Option3: "Soil, Water, Salt",
      Option4: "Air, Food, Water",
      Answer: "Sunlight, Carbon Dioxide, Water",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-026",
      Question: "How many hours are in 2 days?",
      Option1: "48",
      Option2: "24",
      Option3: "36",
      Option4: "60",
      Answer: "48",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-027",
      Question: "Which shape has 4 equal sides and angles?",
      Option1: "Rectangle",
      Option2: "Triangle",
      Option3: "Square",
      Option4: "Circle",
      Answer: "Square",
      Level: "Easy",
      Type: "Simple",
    },
    {
      QNo: "Q-028",
      Question: "Tom reads 2 books every week. How many in 4 weeks?",
      Option1: "8",
      Option2: "6",
      Option3: "10",
      Option4: "12",
      Answer: "8",
      Level: "Medium",
      Type: "Story",
    },
    {
      QNo: "Q-029",
      Question: "Which material will attract a magnet?",
      Option1: "Plastic",
      Option2: "Iron",
      Option3: "Wood",
      Option4: "Glass",
      Answer: "Iron",
      Level: "Medium",
      Type: "Simple",
    },
    {
      QNo: "Q-030",
      Question:
        "Rina baked 3 cakes with 4 slices each. How many slices in total?",
      Option1: "12",
      Option2: "10",
      Option3: "14",
      Option4: "9",
      Answer: "12",
      Level: "Hard",
      Type: "Story",
    },
  ]);

  const handlePaginationChange = (page: number) => {
    setPage(page);
  };

  const index = (page - 1) * limit;
  const paginatedQuestions = questions.slice(index, index + limit);
  const total = questions.length;

  console.log(open);
  return (
    <div className="rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">{challengeName}</h1>
        <AdminButton
          label="Add Question"
          icon={<Plus className="w-6 h-6" />}
          onClick={() => setOpen(true)}
        />
      </div>
      <QuestionsTable
        data={paginatedQuestions}
        page={page}
        limit={limit}
        total={total}
        index={index}
        handlePaginationChange={handlePaginationChange}
      />
    </div>
  );
}

export default TimeChallengeQuestion;
