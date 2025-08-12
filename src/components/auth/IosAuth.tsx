import { Apple } from "lucide-react";

const IosAuth = () => {
  return (
    <button
      className="
      w-full 
      max-w-[320px] 
      md:max-w-[460px] 
      h-[40px] 
      md:h-[48px] 
      bg-transparent 
      border 
      border-gray-600 
      text-gray-400 
      px-4 
      md:px-6 
      rounded-full 
      flex 
      items-center 
      justify-center 
      gap-2 
      md:gap-3 
      font-medium 
      text-sm 
      md:text-lg 
      hover:border-gray-500 
      transition-colors 
      cursor-not-allowed
      mx-auto
    "
    >
      <Apple className="w-5 h-5 md:w-6 md:h-6" />
      <span className="whitespace-nowrap text-sm md:text-base">
        Login with Apple (Coming Soon)
      </span>
    </button>
  );
};

export default IosAuth;
