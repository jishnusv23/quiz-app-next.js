"use client";
import { currentUser } from "@/store/slice/user";
import { useSelector } from "react-redux";

export const UseQuiz = () => {
  const quiz = useSelector((state: any) => state.quiz?.data);
  // console.log("quiz", quiz);
  return quiz;
};
