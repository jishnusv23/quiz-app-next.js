"use client";
import React, { useEffect, useRef, useState } from "react";
import Question from "./Question";
import Options from "./Options";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllQuiz,
  getSingleQuiz,
  updateUserPlayed,
} from "@/services/api/quizApi";
import { useParams } from "next/navigation";
import ScoreBoard from "./Scoreboard";
import { useTimer } from "use-timer";
import { UseUser } from "@/hooks/UseUser";
import { useSelector } from "react-redux";
interface Params {
  id: string;
}
const QuizContainer = () => {
  const user = useSelector((state: any) => state.user?.data);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{}[]>([]);
  const { id }: any = useParams();
  const { time, start, pause, reset, status } = useTimer({
    endTime: 31,
    initialTime: 0,
  });
  const { data: quiz, isLoading } = useQuery({
    queryFn: getSingleQuiz,
    queryKey: ["quiz", id],
  });

  const handleAnswerSubmit = () => {
    setSubmit(true);
    reset();
  };

  const handleQuizIndex = () => {
    setCurrentIndex((prev) => prev + 1);
    setAnswers((prev) => [...prev, selectedOption]);
    setSelectedOption("");
    setSubmit(false);
    setTimer(0);
    start();
  };
  useEffect(() => {
    start();
    
  }, []);

  const score = answers?.filter((item: any) => {
    return item?.isCorrect === true;
  }).length;
  const outOfScore = answers?.length;


  const currentQuestion = quiz?.payload?.questions[currentIndex];
  const questionTitle = quiz?.payload?.title;
  const question = quiz?.payload?.questions;
  const isLastQuestion = currentIndex === quiz?.payload?.questions.length - 1;
  const { mutate: userHistoryUpdate } = useMutation({
    mutationFn: updateUserPlayed,
    onSuccess: (data) => {},
  });

  const handleFinishQuiz = () => {
    console.log("user", user);

    userHistoryUpdate({
      userId: user._id,
      quizData: {
        quizName: questionTitle,
        score: score + 1,
        outOfScore: outOfScore + 1,
        id,
      },
    });
    setCurrentIndex((prev) => prev + 1);
    setAnswers((prev) => [...prev, selectedOption]);
  };
  return (
    <>
      {isLoading ? (
        <div className="w-[80%] mx-auto h-[80vh]">
          
        </div>
      ) : (
        <div className="w-[80%] mx-auto h-[80vh]">
          {time > 30 && answers.length < 3 ? (
            <div className="w-[80%] mx-auto flex items-end justify-end relative top-[5%] mr-[15%]">
              <button
                onClick={() => {
                  handleAnswerSubmit();
                }}
                className="bg-[#FDB101] py-3  w-[20%] text-white rounded-lg hover:text-yellow hover:bg-white hover:border hover:border-[#FDB101]"
              >
                Show Answer
              </button>
            </div>
          ) : (
            <div className="w-[80%] mx-auto flex items-end justify-end relative top-[5%] mr-[15%]">
              <h3 className="font-mono font-bold text-3xl text-gray-700">
                ⏲️ {time}
              </h3>
            </div>
          )}

          {answers.length < question?.length && !isLoading ? (
            <div className="wrapper mt-[6%]">
              <Question
                quizQuestion={currentQuestion?.questionText}
                answers={answers}
              />
              <div className="optionWrapper mt-14 flex flex-wrap gap-7 w-[80%] mx-auto  justify-center">
                {currentQuestion?.options?.map((option: any, i: number) => (
                  <div key={i}>
                    <Options
                      options={option}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      submit={submit}
                    />
                  </div>
                ))}
              </div>
              <div className="w-[70%] mx-auto  flex justify-end items-center">
                {submit ? (
                  isLastQuestion ? (
                    <button
                      onClick={handleFinishQuiz}
                      className="bg-[#FDB101] py-3 mt-10 w-[20%] text-white rounded-lg hover:text-yellow hover:bg-white hover:border hover:border-[#FDB101]"
                    >
                      Finish
                    </button>
                  ) : (
                    <button
                      onClick={handleQuizIndex}
                      className="bg-[#FDB101] py-3 mt-10 w-[20%] text-white rounded-lg hover:text-yellow hover:bg-white hover:border hover:border-[#FDB101]"
                    >
                      Next
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleAnswerSubmit}
                    className="bg-[#FDB101] py-3 mt-10 w-[20%] text-white rounded-lg hover:text-yellow hover:bg-white hover:border hover:border-[#FDB101]"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <ScoreBoard answers={answers} setAnswers={setAnswers} />
          )}
        </div>
      )}
    </>
  );
};

export default QuizContainer;