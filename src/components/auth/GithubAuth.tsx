import { Github } from "lucide-react";

const GithubAuth = () => {
  return (
    <button className="w-full bg-secondary text-background py-4 px-6 rounded-full flex items-center justify-center gap-3 font-medium text-lg transition-colors">
      <Github size={24} />
      Login with GitHub
    </button>
  );
};
export default GithubAuth;
