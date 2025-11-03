import { useState } from "react";
import type { User } from "../types/user";
import UserModal from "./UserModal";

interface UserItemProps {
  user: User;
}

const UserItem = ({ user }: UserItemProps) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  return (
    <>
      <div
        onClick={() => openUserModal(user)}
        className="p-4 mb-4 border border-gray-800 hover:border-gray-400 transition duration-300 rounded-lg shadow-sm cursor-pointer"
      >
        <h3 className="font-semibold mb-1">{user.name}</h3>
        <p className="text-gray-200">Email: {user.email}</p>
        <p className="text-gray-200">Role: {user.role}</p>
      </div>
      {isUserModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserItem;
