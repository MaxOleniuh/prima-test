import type { User } from "../types/User";

interface UserRoleFilterProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  data: User[] | null;
}

const UserRoleFilter = ({
  data,
  roleFilter,
  setRoleFilter,
}: UserRoleFilterProps) => {
  return (
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
  );
};

export default UserRoleFilter;
