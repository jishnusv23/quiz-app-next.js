"use client";
import React, { useState } from "react";
import QuizThumbnile from "./QuizThumbnil";
import QuizQuestion from "./QuizQuestion";

const AddQuiz = () => {
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details"
  );
  const [isDesktop, setIsDesktop] = useState(true);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="h-[100vh] bg-background from-slate-50 to-slate-100 flex flex-col">
        <div className="bg-white/50 border-b border-slate-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-all ${
                activeTab === "details"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-white/80"
                  : "text-slate-600 hover:text-purple-500 hover:bg-white/40"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Quiz Details</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("questions")}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-all ${
                activeTab === "questions"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-white/80"
                  : "text-slate-600 hover:text-purple-500 hover:bg-white/40"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Questions</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === "details" ? <QuizThumbnile /> : <QuizQuestion />}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100vh] bg-background from-slate-50 to-slate-100 flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 border-r border-slate-200 bg-background">
          <div className="h-full flex flex-col">
            <div className="bg-background border-b border-slate-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">Quiz Details</h2>
                  <p className="text-sm text-slate-600">
                    Basic information and settings
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <QuizThumbnile />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-background">
          <div className="h-full flex flex-col">
            <div className="bg-background border-b border-slate-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">
                    Add Questions
                  </h2>
                  <p className="text-sm text-slate-600">
                    Create your quiz questions and answers
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <QuizQuestion />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background backdrop-blur-sm border-t  p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transform transition-transform duration-500 ease-out w-1/2"></div>
            </div>
            <span className="text-sm text-slate-600 font-medium">
              Step 1 of 2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
