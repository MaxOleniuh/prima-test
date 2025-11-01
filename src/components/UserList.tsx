import { useState, useEffect } from "react";
import type { User } from "../types/User";
import UserItem from "./UserItem";

interface UserListProps {
  searchTerm: string;
  roleFilter: string;
  setData: (data: User[] | null) => void;
  data: User[] | null;
}

const UserList = ({ searchTerm, roleFilter, setData, data }: UserListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredUsers =
    data?.filter((user) => {
      const matchesName = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesName && matchesRole;
    }) || [];

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No users found.</div>;
  }

  return (
    <>
      <ul>
        {data &&
          filteredUsers.map((item) => (
            <li key={item.id}>
              <UserItem user={item} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default UserList;
