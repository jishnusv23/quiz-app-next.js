"use client";
import { GithubAuthAction } from "@/store/action/auth/GithubAuth";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const GithubAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUrl = `${window.location.origin}/api/github`;

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user:email`;
  };


  return (
    <button
      onClick={handleLogin}
      className="
      w-full 
      max-w-[320px] 
      md:max-w-[460px] 
      h-[40px] 
      md:h-[48px] 
      bg-secondary 
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
     
      mx-auto
    "
    >
      <Github size={24} />
      Login with GitHub
    </button>
  );
};
export default GithubAuth;
