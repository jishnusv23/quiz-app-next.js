"use client";
import React from "react";
import QuizCard from "./QuizCard";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllQuiz } from "@/services/api/quizApi";

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
   const { data: quizData } = useQuery({
     queryFn: getAllQuiz,
     queryKey: ["quizzes"],
   });
   console.log("🚀 ~ QuizList ~ quizData:", quizData);
   const quizzes: QuizData[] =
     quizData?.payload?.map((quiz: any) => ({
       id: quiz._id,
       title: quiz.title,
       description: quiz.description,
       image: quiz.thumbnail,
       difficulty: quiz.difficulty,
       duration: quiz.duration,
       category: quiz.category,
     })) || [];

  const handlePlayNow = (quiz: QuizData) => {
    router.push(`/quiz/${quiz.id}`);
   
  };

  return (
    <div className="min-h-screen bg-background from-slate-50 via-blue-50 to-indigo-100">

      <div className="bg-background ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Quizzes
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Challenge yourself with our comprehensive collection of
              interactive quizzes. Test your skills and expand your knowledge
              across various topics.
            </p>
          </div>
        </div>
      </div>

  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        

     
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
