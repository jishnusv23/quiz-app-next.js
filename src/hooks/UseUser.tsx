"use client";
import { getCurrentuser } from "@/services/api/quizApi";
import { currentUser } from "@/store/slice/user";
import { useSelector } from "react-redux";

export const UseUser = async () => {
  return currentUser;
};
