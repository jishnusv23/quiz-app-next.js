import EmailAuth from "@/components/auth/EmailAuth";
import GithubAuth from "@/components/auth/GithubAuth";
import GoogleAuth from "@/components/auth/GoogleAuth";
import IosAuth from "@/components/auth/IosAuth";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center ">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-white text-3xl md:text-4xl font-light mb-12">
            Log into your account
          </h1>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-3  ">
          <GithubAuth />
          <EmailAuth />
          <GoogleAuth />
          <IosAuth />
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-gray-400 text-base">
            New to Algo Arena? Create account (Coming Soon)
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
