import React from "react";
import { useTimer } from "use-timer";
interface QuestionProps {
  quizQuestion: string;
  answers: any;
}
const Question: React.FC<QuestionProps> = ({ quizQuestion, answers }) => {


  return (
    <div className="flex flex-col">
      <div className="ml-[15%] flex gap-4">
        {answers?.map((x: any, index: number) => (
          <p
            key={index}
            className={`w-7 h-7 rounded-full ${
              x.isCorrect === false || x === "" ? "bg-red-500" : "bg-[#74F40F]"
            }`}
          ></p>
        ))}
      </div>
      <p className="text-yellow capitalize font-semibold text-3xl text-center font-mono">
        Q: {quizQuestion}
      </p>
      <iframe
        className="h-[10vh]"
        src="https://lottie.host/embed/867d946f-0d8f-4f2f-b997-d2abba2f103b/vXsCrwhFzj.json"
      ></iframe>
    </div>
  );
};


export default React.memo(Question);
