import { useState } from "react";
import type { User } from "../types/user";
import UserSearchFilter from "./UserSearchFilter";
import UserRoleFilter from "./UserRoleFilter";
import UserList from "./UserList";

const Dashboard = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState("All");

  return (
    <div className="py-20 px-10 max-w-5xl w-full mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-8 sm:mb-10 md:mb-14">
        User Dashboard
      </h1>
      <div className="w-full gap-4 mb-6 flex flex-col sm:flex-row items-center">
        <UserSearchFilter
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <UserRoleFilter
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          data={data}
        />
      </div>
      <UserList
        data={data}
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        setData={setData}
      />
    </div>
  );
};

export default Dashboard;
