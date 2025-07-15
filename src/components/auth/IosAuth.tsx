import { Apple } from "lucide-react";

const IosAuth = () => {
  return (
    <button className="w-full bg-transparent border border-gray-600 text-gray-400 py-4 px-6 rounded-full flex items-center justify-center gap-3 font-medium text-lg hover:border-gray-500 transition-colors cursor-not-allowed">
      <Apple size={24} />
      Login with Apple (Coming Soon)
    </button>
  );
};
export default IosAuth