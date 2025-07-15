"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "../ui/theme-provider";
import { Player } from "@lottiefiles/react-lottie-player";

const MainBanner = () => {
  const { theme } = useTheme();

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="flex flex-col space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="flex justify-center lg:justify-start">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/common/istock.jpg"
                  alt="Algorithm Arena Banner"
                  width={500}
                  height={400}
                  className="w-full h-auto max-w-md lg:max-w-lg object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Brand Title */}
            <div className="space-y-4">
              <div
                className={`flex items-center justify-center lg:justify-start cursor-pointer transition-all duration-300 hover:scale-105 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-pink-700 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                }`}
              >
                <span className="font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight">
                  ALGO
                </span>
                <span className="font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight ml-2">
                  ARENA
                </span>
              </div>

              {/* Subtitle */}
              <p
                className={`text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                Master algorithms, compete with peers, and level up your coding
                skills in the ultimate programming battleground.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                size="lg"
                className={`px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  theme === "light"
                    ? "bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700"
                    : "bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                } text-white border-0 rounded-full`}
              >
                Join the Arena
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* Right Animation Section */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative z-10">
                <Player
                  src="https://lottie.host/b2f9ca5d-45fa-4ec5-89ef-fd1ee1511823/JQNn1dwbMs.json"
                  background="transparent"
                  speed={1}
                  loop
                  autoplay
                  className="w-full h-auto max-w-md lg:max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`p-6 rounded-xl ${
              theme === "light" ? "bg-white shadow-lg" : "bg-gray-800 shadow-xl"
            } hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
          >
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Compete & Win</h3>
            <p
              className={theme === "light" ? "text-gray-600" : "text-gray-300"}
            >
              Challenge yourself in coding competitions and climb the
              leaderboard.
            </p>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === "light" ? "bg-white shadow-lg" : "bg-gray-800 shadow-xl"
            } hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
          >
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Learn & Grow</h3>
            <p
              className={theme === "light" ? "text-gray-600" : "text-gray-300"}
            >
              Master data structures and algorithms with interactive tutorials.
            </p>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === "light" ? "bg-white shadow-lg" : "bg-gray-800 shadow-xl"
            } hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
          >
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">Connect & Share</h3>
            <p
              className={theme === "light" ? "text-gray-600" : "text-gray-300"}
            >
              Join a community of passionate developers and share knowledge.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MainBanner;
