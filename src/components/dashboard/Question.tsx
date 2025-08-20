import React, { useState } from "react";
import { Copy, Check, Code2, FileText } from "lucide-react";

interface QuestionProps {
  quizQuestion: string;
  answers: any;
}

const Question: React.FC<QuestionProps> = ({ quizQuestion, answers }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quizQuestion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Simple syntax highlighting for common patterns
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="text-[#6a9955]">$1</span>') // Comments
      .replace(
        /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g,
        '<span class="text-[#569cd6]">$1</span>'
      ) // Keywords
      .replace(
        /\b(true|false|null|undefined)\b/g,
        '<span class="text-[#569cd6]">$1</span>'
      ) // Literals
      .replace(
        /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g,
        '<span class="text-[#ce9178]">$1$2$1</span>'
      ) // Strings
      .replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>') // Numbers
      .replace(/([{}[\]()])/g, '<span class="text-[#ffd700]">$1</span>') // Brackets
      .replace(
        /(console\.log|console\.error|console\.warn)/g,
        '<span class="text-[#dcdcaa]">$1</span>'
      ); // Console methods
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Answer Progress Indicators */}
      <div className="ml-[15%] flex gap-4">
        {answers?.map((x: any, index: number) => (
          <div
            key={index}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              x.isCorrect === false || x === ""
                ? "bg-[#f85149] text-white"
                : "bg-[#238636] text-white"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* VS Code Style Question Container */}
      <div className="mx-auto w-[85%] bg-[#1e1e1e] rounded-lg border border-[#3c3c3c] overflow-hidden shadow-2xl">
        {/* VS Code Header Bar */}
        <div className="bg-[#2d2d30] border-b border-[#3c3c3c] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 ml-4">
              <FileText className="w-4 h-4 text-[#8b949e]" />
              <span className="text-[#c9d1d9] text-sm font-medium">
                question.js
              </span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#3c3c3c] transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#238636]" />
                <span className="text-[#238636] text-sm">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#8b949e]" />
                <span className="text-[#8b949e] text-sm">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="bg-[#0d1117] p-6">
          <div className="flex">
            {/* Line Numbers */}
            <div className="text-[#6e7681] font-mono text-sm pr-4 border-r border-[#21262d] mr-4 select-none">
              {quizQuestion.split("\n").map((_, index) => (
                <div key={index} className="leading-6">
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-x-auto">
              <pre className="text-[#c9d1d9] font-mono text-sm leading-6">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(quizQuestion),
                  }}
                />
              </pre>
            </div>
          </div>
        </div>

        {/* Footer with Language Info */}
      </div>

      {/* Optional Animation/Illustration */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 rounded-full animate-pulse flex items-center justify-center transition-all duration-300">
          <Code2 className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Question);
