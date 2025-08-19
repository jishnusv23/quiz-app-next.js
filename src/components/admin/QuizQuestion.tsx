"use client";
import { UseQuiz } from "@/hooks/UseQuiz";
import { saveAnswer } from "@/services/api/quizApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  options: Option[];
}

const QuizQuestion: React.FC = () => {
  const quizData = UseQuiz();
  const router = useRouter();
  const { data: quizStored } = useSelector((state: any) => state.quiz);
  console.log("stored", quizStored);

  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [questions, setQuestions] = useState<Question[]>([
    {
      questionText: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ]);

  const validateQuestions = () => {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.questionText.trim() === "") {
        return `Question ${i + 1}: Question text cannot be empty.`;
      }

      const correctOptions = question.options.filter(
        (option) => option.isCorrect
      );
      if (correctOptions.length === 0) {
        return `Question ${i + 1}: Must have at least one correct option.`;
      }

      for (let j = 0; j < question.options.length; j++) {
        if (question.options[j].text.trim() === "") {
          return `Question ${i + 1}: Option ${j + 1} text cannot be empty.`;
        }
      }
    }
    return "";
  };

  const { mutate: savedMutate } = useMutation({
    mutationFn: saveAnswer,
    onSuccess: (data) => {
      setLoading(false);
      router.replace("/admin");
      console.log("my data ", data);
    },
    onError: (error) => {
      setLoading(false);
      setError("Failed to save questions. Please try again.");
    },
  });

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
    if (error) setError("");
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
    if (error) setError("");
  };

  const handleIsCorrectChange = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.map(
      (option, index) => ({
        ...option,
        isCorrect: index === oIndex,
      })
    );
    setQuestions(newQuestions);
    if (error) setError("");
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const saveQuestions = () => {
    setLoading(true);
    setError("");

    const validationError = validateQuestions();
    if (validationError) {
      setLoading(false);
      return setError(validationError);
    }

    savedMutate({
      questions,
      quizId: quizData.payload?._id,
    });
  };

  return (
    <div className="h-full bg-background from-slate-50 to-slate-100 flex flex-col">
      <div className="p-6 border-b border-slate-200bg-gradient-to-br backdrop-blur-sm">
        <h2 className="text-center font-bold text-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Add Questions
        </h2>
        <p className="text-center text-slate-600 mt-2">
          Create engaging questions for your quiz ({questions.length} question
          {questions.length !== 1 ? "s" : ""})
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-700">
                  Question {qIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-colors"
                    title="Remove question"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Question Text *
                </label>
                <textarea
                  placeholder="Enter your question here..."
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Answer Options * (Select the correct answer)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className={`relative border-2 rounded-xl p-4 transition-all ${
                        option.isCorrect
                          ? "border-green-400 bg-green-50"
                          : "border-slate-200 bg-slate-50 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 pt-1">
                          <input
                            type="radio"
                            name={`isCorrect-${qIndex}`}
                            checked={option.isCorrect}
                            onChange={() =>
                              handleIsCorrectChange(qIndex, oIndex)
                            }
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Option {String.fromCharCode(65 + oIndex)}
                          </label>
                          <input
                            type="text"
                            placeholder={`Enter option ${String.fromCharCode(
                              65 + oIndex
                            )}`}
                            value={option.text}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                              option.isCorrect
                                ? "border-green-300 bg-white"
                                : "border-slate-300 bg-white"
                            }`}
                          />
                        </div>
                      </div>
                      {option.isCorrect && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                            Correct
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 bg-background backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={addQuestion}
            className="flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Question</span>
          </button>

          <button
            onClick={saveQuestions}
            disabled={loading}
            className={`flex-1 sm:flex-none text-white font-semibold py-3 px-6 rounded-xl duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300/50 flex items-center justify-center space-x-2 ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save Questions</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
