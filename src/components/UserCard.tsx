import React from "react";

interface UserProps {
  userName: string;
  userID: string;
}
const UserCard: React.FC<UserProps> = ({ userName, userID }) => {
  return (
    <div className="flex items-center justify-center bg-neutral">
      <div className="card bg-neutral shadow-lg p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2 text-primary">Welcome</h2>
        <p className="text-gray-100">
          Your database-ready user name is {userName}.
        </p>
        <p className="text-gray-100">Your ID is {userID}.</p>
        <p className="text-gray-100">Not much else is implemented yet.</p>
      </div>
    </div>
  );
};

export default UserCard;
