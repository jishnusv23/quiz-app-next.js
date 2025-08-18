"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageUpload } from "@/services/cloudinary/upload";
import { useMutation } from "@tanstack/react-query";
import { saveQuiz } from "@/services/api/quizApi";
import { useDispatch } from "react-redux";
import { quizCreated } from "@/store/slice/quiz";

interface QuizData {
  title: string;
  description: string;
  thumbnail: string;
  difficulty: string;
  duration: string;
  questions: number;
  category: string;
}

const QuizThumbnail = () => {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    duration: "",
    questions: 1,
    category: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { mutate: savedMutate } = useMutation({
    mutationFn: saveQuiz,
    onSuccess: (data) => {
      console.log(data);
      setLoading(false);
      setImage(null);
      setFormData({
        title: "",
        description: "",
        difficulty: "Easy",
        duration: "",
        questions: 1,
        category: "",
      });
      dispatch(quizCreated(data));
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "questions" ? parseInt(value) || 1 : value,
    }));
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!image) {
      setError("Please upload an image");
      return false;
    }
    if (!formData.title.trim()) {
      setError("Please enter a title");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Please enter a description");
      return false;
    }
    if (!formData.category.trim()) {
      setError("Please enter a category");
      return false;
    }
    if (!formData.duration.trim()) {
      setError("Please enter duration");
      return false;
    }
    if (formData.questions < 1) {
      setError("Questions must be at least 1");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const savedImage = await ImageUpload(image!);
      savedMutate({
        ...formData,
        thumbnail: savedImage,
      });
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImage(dataURL);
        if (error) setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const categoryOptions = [
    "Frontend",
    "Backend",
    "Full Stack",
    "Database",
    "DevOps",
    "Mobile",
    "UI/UX",
  ];

  return (
    <div className="h-full flex flex-col bg-background from-slate-50 to-slate-100">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Image Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Quiz Thumbnail *
            </label>
            <div className="relative border-2 border-dashed border-purple-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Quiz thumbnail"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <svg
                    className="mx-auto h-8 w-8 text-purple-400 mb-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <label className="cursor-pointer">
                    <span className="text-purple-600 font-semibold hover:text-purple-700 text-sm">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-slate-500 text-xs mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quiz Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Node.js Backend Development"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this quiz covers..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              >
                <option value="">Select a category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

           
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Difficulty *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                >
                  {difficultyOptions.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 30 mins"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Number of Questions *
              </label>
              <input
                type="number"
                name="questions"
                value={formData.questions}
                onChange={handleInputChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          {/* Quick Stats Preview */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm">
              Quiz Preview
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="text-slate-600">
                  Difficulty: {formData.difficulty}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-slate-600">
                  Questions: {formData.questions}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span className="text-slate-600">
                  Duration: {formData.duration || "Not set"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span className="text-slate-600">
                  Category: {formData.category || "Not set"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button - Fixed at bottom */}
      <div className="p-6 border-t border-slate-200 bg-background backdrop-blur-sm">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full text-white font-semibold py-3 px-6 rounded-xl duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 relative overflow-hidden group/btn ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600"
          }`}
        >
          <span className="relative z-10">
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                <span>Creating Quiz...</span>
              </span>
            ) : (
              "Create Quiz"
            )}
          </span>

          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizThumbnail;
