import React from "react";
import SignupForm from "./SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-items-center justify-between bg-neutral text-base-content">
      <header className="sticky top-0 w-full bg-neutral text-neutral-content p-4 ">
        <nav className="max-w-screen-lg mx-auto flex justify-end items-center">
          <a href="index.html" className="btn btn-outline btn-primary mt-6">
            Home
          </a>
        </nav>
      </header>

      <main className="flex flex-grow flex-col items-center justify-around w-full">
        <SignupForm />
      </main>

      <footer className="w-full bg-neutral text-neutral-content p-4 text-center">
        <div className="max-w-screen-lg mx-auto">
          <p>&copy; 2024 Subconscious Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;
