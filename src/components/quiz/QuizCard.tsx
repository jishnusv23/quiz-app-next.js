"use client";
import React from "react";
import { useTheme } from "../ui/theme-provider";

// TypeScript interfaces
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

interface QuizCardProps {
  data: QuizData;
  onPlayNow?: (quiz: QuizData) => void;
}

// QuizCard Component
const QuizCard: React.FC<QuizCardProps> = ({
  data,
  onPlayNow = () => console.log("Play Now clicked!"),
}) => {
  const {
    title,
    description,
    image,
    difficulty,
    duration,

    category,
  } = data;
  const { theme } = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=200&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
              {category}
            </span>
          </div>
        )}

        {/* Difficulty Badge */}
        {difficulty && (
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                difficulty
              )}`}
            >
              {difficulty}
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2  transition-colors duration-300 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[60px]">
          {description}
        </p>

        {/* Quiz Stats */}
        <div className="flex items-center gap-4 mb-6 text-xs text-gray-500">
        
          {duration && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{duration}</span>
            </div>
          )}
        </div>

        {/* Play Now Button */}
        <button
          onClick={() => onPlayNow(data)}
          className={`w-full text-white font-semibold py-3 px-6 rounded-xl  duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 relative overflow-hidden group/btn ${
            theme === "light"
              ? "bg-gradient-to-r from-pink-700 via-purple-600 to-blue-600 hover:from-pink-800 hover:via-purple-700 hover:to-blue-700"
              : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600"
          }`}
        >
          <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
          <span className="relative flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 transition-transform group-hover/btn:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Play Now
          </span>
        </button>
      </div>
    </div>
  );
};
export default QuizCard;
