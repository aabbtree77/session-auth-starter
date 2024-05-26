import React from "react";
import SignoutButton from "./SignoutButton";
import UserCard from "./UserCard";

interface UserProps {
  userName: string;
  userID: string;
}

const UserPage: React.FC<UserProps> = ({ userName, userID }) => {
  return (
    <div className="min-h-screen flex flex-col justify-items-center justify-between bg-neutral text-base-content">
      <header className="sticky top-0 w-full bg-neutral text-neutral-content p-4 ">
        <nav className="max-w-screen-lg mx-auto flex justify-end items-center">
          <SignoutButton />
        </nav>
      </header>

      <main className="bg-neutral flex flex-grow flex-col items-center justify-around w-full">
        <UserCard userName={userName} userID={userID} />
      </main>

      <footer className="w-full bg-neutral text-neutral-content p-4 text-center">
        <div className="max-w-screen-lg mx-auto">
          <p>&copy; 2024 Subconscious Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserPage;
