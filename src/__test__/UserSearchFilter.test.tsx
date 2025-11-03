import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserSearchFilter from "../components/UserSearchFilter";

describe("UserSearchFilter Component", () => {
  test("renders input with correct initial value", () => {
    const mockSetSearchTerm = jest.fn();
    render(
      <UserSearchFilter searchTerm="Alice" setSearchTerm={mockSetSearchTerm} />
    );

    const input = screen.getByPlaceholderText(
      /filter users by name/i
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Alice");
  });

  test("calls setSearchTerm on input change", () => {
    const mockSetSearchTerm = jest.fn();
    render(
      <UserSearchFilter searchTerm="" setSearchTerm={mockSetSearchTerm} />
    );

    const input = screen.getByPlaceholderText(/filter users by name/i);
    fireEvent.change(input, { target: { value: "Bob" } });

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Bob");
  });

  test("updates correctly when typing multiple characters", () => {
    const mockSetSearchTerm = jest.fn();
    render(
      <UserSearchFilter searchTerm="" setSearchTerm={mockSetSearchTerm} />
    );

    const input = screen.getByPlaceholderText(/filter users by name/i);
    fireEvent.change(input, { target: { value: "B" } });
    fireEvent.change(input, { target: { value: "Bo" } });
    fireEvent.change(input, { target: { value: "Bob" } });

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(3);
    expect(mockSetSearchTerm).toHaveBeenLastCalledWith("Bob");
  });
});
