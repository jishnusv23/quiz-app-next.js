import React, { useState } from "react";
import { Copy, Check, CheckCircle, XCircle } from "lucide-react";

const Options = ({
  options,
  setSelectedOption,
  selectedOption,
  submit,
}: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(options.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const isSelected = selectedOption?.text === options.text;
  const isCorrect = submit && options.isCorrect;
  const isWrong = submit && isSelected && !options.isCorrect;

  return (
    <div
      onClick={() => {
        if (!submit) {
          setSelectedOption(options);
        }
      }}
      className={`relative group w-[23rem] min-h-[4rem] rounded-xl border-2 cursor-pointer transition-all duration-300 p-4 flex items-center justify-between hover:shadow-lg
        ${
          isCorrect
            ? "bg-green-50 border-green-400 text-green-800 shadow-green-200"
            : isWrong
            ? "bg-red-50 border-red-400 text-red-800 shadow-red-200"
            : isSelected
            ? "bg-blue-50 border-blue-400 text-blue-800 shadow-blue-200"
            : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
        }`}
    >
      {/* Option Text */}
      <div className="flex-1">
        <p className="text-lg font-mono font-medium leading-relaxed">
          {options?.text}
        </p>
      </div>

      {/* Right Side Actions/Indicators */}
      <div className="flex items-center gap-3 ml-4">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/50
            ${
              isCorrect
                ? "hover:bg-green-100"
                : isWrong
                ? "hover:bg-red-100"
                : isSelected
                ? "hover:bg-blue-100"
                : "hover:bg-gray-100"
            }
          `}
          title="Copy option"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {/* Result Indicators */}
        {submit && (
          <div className="flex items-center">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : isWrong ? (
              <XCircle className="w-6 h-6 text-red-600" />
            ) : null}
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && !submit && (
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
        )}
      </div>

      {/* Selection Ring Effect */}
      {isSelected && !submit && (
        <div className="absolute inset-0 rounded-xl border-2 border-blue-400 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
};

export default Options;
