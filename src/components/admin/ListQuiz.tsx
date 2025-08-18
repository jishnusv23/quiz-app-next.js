"use client";
import React from "react";
import QuizCard from "../quiz/QuizCard";
import { useRouter } from "next/navigation";

interface QuizData {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  duration?: string;
  questions?: number;
  category?: string;
}

const QuizList: React.FC = () => {
  const router = useRouter();
  const quizzes: QuizData[] = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description:
        "Test your knowledge of JavaScript basics including variables, functions, arrays, and objects. Perfect for beginners and intermediate developers looking to solidify their foundation.",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
      difficulty: "Easy",
      duration: "15 mins",
      questions: 20,
      category: "Programming",
    },
    {
      id: "2",
      title: "React Hooks Mastery",
      description:
        "Deep dive into React Hooks including useState, useEffect, useContext, and custom hooks. Advanced concepts for modern React development and state management.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      difficulty: "Hard",
      duration: "25 mins",
      questions: 30,
      category: "React",
    },
    {
      id: "3",
      title: "Python Data Science",
      description:
        "Explore data analysis with Python, pandas, numpy, and matplotlib. Perfect for aspiring data scientists and analysts working with real-world datasets.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
      difficulty: "Medium",
      duration: "20 mins",
      questions: 25,
      category: "Data Science",
    },
    {
      id: "4",
      title: "CSS Grid & Flexbox",
      description:
        "Master modern CSS layout techniques. Learn when and how to use Grid and Flexbox for creating responsive, professional web layouts and designs.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      difficulty: "Medium",
      duration: "18 mins",
      questions: 22,
      category: "CSS",
    },
    {
      id: "5",
      title: "Node.js Backend Development",
      description:
        "Build robust backend applications with Node.js, Express, and MongoDB. Learn API development, authentication, and database integration from scratch.",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
      difficulty: "Hard",
      duration: "30 mins",
      questions: 35,
      category: "Backend",
    },
    {
      id: "6",
      title: "UI/UX Design Principles",
      description:
        "Understand the fundamentals of user interface and user experience design. Learn about color theory, typography, layout, and user-centered design thinking.",
      image:
        "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=200&fit=crop",
      difficulty: "Easy",
      duration: "12 mins",
      questions: 18,
      category: "Design",
    },
  ];

  const handlePlayNow = (quiz: QuizData) => {
    router.push(`/quiz/${quiz.id}`);
  };

  return (
    <div className="min-h-screen bg-background from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} data={quiz} onPlayNow={handlePlayNow} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default QuizList;
