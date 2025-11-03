import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserRoleFilter from "../components/UserRoleFilter";
import type { User } from "../types/user";

describe("UserRoleFilter Component", () => {
  const mockSetRoleFilter = jest.fn();

  const mockData: User[] = [
    {
      id: "1",
      name: "Alice",
      email: "alice@test.com",
      role: "Admin",
      avatar: "",
      status: true,
    },
    {
      id: "2",
      name: "Bob",
      email: "bob@test.com",
      role: "User",
      avatar: "",
      status: true,
    },
    {
      id: "3",
      name: "Charlie",
      email: "charlie@test.com",
      role: "Admin",
      avatar: "",
      status: false,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders default 'All' option and unique roles", () => {
    render(
      <UserRoleFilter
        roleFilter="All"
        setRoleFilter={mockSetRoleFilter}
        data={mockData}
      />
    );

    // Check default option
    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();

    // Check unique roles
    expect(screen.getByRole("option", { name: "Admin" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "User" })).toBeInTheDocument();

    // Ensure no duplicate roles rendered
    const options = screen.getAllByRole("option");
    const optionNames = options.map((opt) => opt.textContent);
    const uniqueNames = Array.from(new Set(optionNames));
    expect(optionNames).toEqual(uniqueNames);
  });

  test("calls setRoleFilter when a role is selected", () => {
    render(
      <UserRoleFilter
        roleFilter="All"
        setRoleFilter={mockSetRoleFilter}
        data={mockData}
      />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;

    fireEvent.change(select, { target: { value: "Admin" } });
    expect(mockSetRoleFilter).toHaveBeenCalledTimes(1);
    expect(mockSetRoleFilter).toHaveBeenCalledWith("Admin");

    fireEvent.change(select, { target: { value: "User" } });
    expect(mockSetRoleFilter).toHaveBeenCalledTimes(2);
    expect(mockSetRoleFilter).toHaveBeenCalledWith("User");
  });

  test("renders correctly when data is null", () => {
    render(
      <UserRoleFilter
        roleFilter="All"
        setRoleFilter={mockSetRoleFilter}
        data={null}
      />
    );

    // Should render only the default 'All' option
    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Admin" })
    ).not.toBeInTheDocument();
  });
});
