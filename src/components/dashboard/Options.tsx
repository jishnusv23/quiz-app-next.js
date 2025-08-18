import React from "react";

const Options = ({
  options,
  setSelectedOption,
  selectedOption,
  submit,
}: any) => {
  return (
    <div
      onClick={() => {
        setSelectedOption(options);
      }}
      className={`w-[23rem] h-[4rem] rounded-3xl border-dashed border-[2px] cursor-pointer flex items-center justify-center 
        ${
          submit === true && options.isCorrect
            ? "bg-[#74F40F] border-[#74F40F]"
            : submit === true &&
              selectedOption.text === options.text &&
              !options.isCorrect
            ? "bg-red-500"
            : selectedOption.text === options.text
            ? "bg-[#FDB101]"
            : ""
        } border-[#FDB101]`}
    >
      <p className="text-xl font-mono text-gray-600 font-semibold">
        {options?.text}
      </p>
    </div>
  );
};

export default Options;
