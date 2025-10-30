import { useState, useEffect } from "react";
import type { User } from "../types/User";

const Dashboard = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    data?.filter((user) =>
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="py-20 px-10 max-w-5xl w-full mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-8 sm:mb-10 md:mb-14">
        User Dashboard
      </h1>
      <div>
        <input
          type="text"
          placeholder="Filter users by role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 sm:mb-4 md:mb-6 w-full p-2 border border-gray-700 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul>
        {isLoading && <p className="text-center">Loading...</p>}
        {data &&
          filteredUsers.map((item) => (
            <li key={item.id}>
              <div className="p-4 mb-4 border border-gray-800 rounded-lg shadow-sm hover:border-gray-500 hover:cursor-pointer transition duration-200">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-gray-200">Email: {item.email}</p>
                <p className="text-gray-200">Role: {item.role}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;
