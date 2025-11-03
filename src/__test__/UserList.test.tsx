import { render, screen, waitFor } from "@testing-library/react";
import UserList from "../components/UserList";
import type { User } from "../types/user";

// Mock global fetch
global.fetch = jest.fn();

describe("UserList", () => {
  const mockSetData = jest.fn();

  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@test.com",
      role: "Admin",
      avatar: "",
      status: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@test.com",
      role: "User",
      avatar: "",
      status: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockUsers),
    });
  });

  test("fetches and displays user data", async () => {
    render(
      <UserList
        searchTerm=""
        roleFilter="All"
        setData={mockSetData}
        data={mockUsers}
      />
    );

    // Loading state
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait until fetch resolves & UI updates
    await waitFor(() => {
      expect(mockSetData).toHaveBeenCalledWith(mockUsers);
    });

    // Users should appear
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/Jane Smith/i)).toBeInTheDocument();
  });
});
