import { updateUserPlayed } from "@/services/api/quizApi";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const ScoreBoard = ({ answers, setAnswers }: any) => {
  const score = answers?.filter((item: any) => {
    return item?.isCorrect === true;
  }).length;
  const outOfScore = answers?.length;

  return (
    <div className="w-[60%] mx-auto mt-[10%] border-2 shadow-2xl flex items-center justify-center flex-col  border-dotted border-[#FDB101] h-[30vh] ">
      <h3 className="text-center font-primary text-2xl font-semibold">
        Your Score
      </h3>
      <h3 className="text-center font-semibold text-xl">
        {score}/{outOfScore}
      </h3>
      <p>Better Luck Next Time</p>
    </div>
  );
};

export default ScoreBoard;
