import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-items-center justify-between bg-neutral text-base-content">
      <header className="sticky top-0 w-full bg-neutral text-neutral-content p-4 ">
        <nav className="max-w-screen-lg mx-auto flex justify-end items-center">
          <a href="signin.html" className="btn btn-outline btn-primary mt-6">
            Sign in
          </a>
        </nav>
      </header>

      <main className="flex flex-grow flex-col items-center justify-around w-full">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Subconscious Flow
        </h1>

        <div className="max-w-screen-lg mx-auto">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start md:text-end mb-10">
                <time className="font-mono italic">2024</time>
                <div className="text-lg font-black">Problem</div>
                We live in the era of AI, Web3, SpaceX... Yet, an average school
                teacher has to manually process hundreds of student tests on a
                weekly basis. A lot can be automated.
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">2025</time>
                <div className="text-lg font-black">Solution</div>
                Our web service allows teachers to create and save quizzes, and
                send them to students, who then send back the answers. It is
                fully automated and free forever. Please{" "}
                <a className="link link-accent">donate</a> if you find it
                useful.
              </div>
              <hr />
            </li>
          </ul>
        </div>
        <a href="signup.html" className="btn btn-primary mt-6">
          Create a new account
        </a>
      </main>

      <footer className="w-full bg-neutral text-neutral-content p-4 text-center">
        <div className="max-w-screen-lg mx-auto">
          <p>&copy; 2024 Subconscious Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
