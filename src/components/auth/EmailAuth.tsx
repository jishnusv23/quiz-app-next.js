import { Mail } from "lucide-react";

const EmailAuth = () => {
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
      <Mail size={24} />
      Login with email (Coming Soon)
    </button>
  );
};
export default EmailAuth;
