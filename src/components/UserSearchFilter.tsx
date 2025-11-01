interface UserSearchFilterProps {
  setSearchTerm: (term: string) => void;
  searchTerm: string;
}

const UserSearchFilter = ({
  setSearchTerm,
  searchTerm,
}: UserSearchFilterProps) => {
  return (
    <input
      type="text"
      placeholder="Filter users by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 border border-gray-700 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default UserSearchFilter;
