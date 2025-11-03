import { useEffect } from "react";
import type { User } from "../types/user";
import { X } from "lucide-react";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModal = ({ user, onClose }: UserModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50"
    >
      <div className="bg-[#09090b] border border-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 p-2 text-gray-500 hover:text-gray-300 duration-300 transition text-xl font-bold"
        >
          <X size={15} />
        </button>

        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-2">
            <img
              width={84}
              height={84}
              src={user.avatar}
              alt={user.name}
              className="rounded-full"
            />
          </div>

          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-gray-200">{user.email}</p>
          <p className="text-gray-400 text-sm">Role: {user.role}</p>
          <p
            className={`text-sm font-medium ${
              user.status === true ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {user.status ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
