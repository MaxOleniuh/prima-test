import { useState, useEffect } from "react";
import type { User } from "../types/User";
import UserModal from "./UserModal";

const Dashboard = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://6479a6ffa455e257fa637ef2.mockapi.io/users"
      );
      const json = await response.json();
      setData(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredUsers =
    data?.filter((user) => {
      const matchesName = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesName && matchesRole;
    }) || [];

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  return (
    <>
      <div className="py-20 px-10 max-w-5xl w-full mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-8 sm:mb-10 md:mb-14">
          User Dashboard
        </h1>
        <div className="w-full gap-4 mb-6 flex flex-col sm:flex-row items-center">
          <input
            type="text"
            placeholder="Filter users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Role Filter Dropdown */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full ml-auto sm:w-48 p-2 border border-gray-700 rounded-md bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Default option */}
            <option value="All">All</option>

            {/* Unique roles */}
            {[...new Set(data?.map((user) => user.role))].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {isLoading && <p className="text-center">Loading...</p>}
          {data &&
            filteredUsers.map((item) => (
              <li key={item.id}>
                <div
                  onClick={() => openUserModal(item)}
                  className="p-4 mb-4 border border-gray-800 rounded-lg shadow-sm hover:border-gray-500 hover:cursor-pointer transition duration-200"
                >
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-gray-200">Email: {item.email}</p>
                  <p className="text-gray-200">Role: {item.role}</p>
                </div>
              </li>
            ))}
        </ul>
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

export default Dashboard;
