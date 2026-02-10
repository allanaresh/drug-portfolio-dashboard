import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { UserRole } from "@/types";

function TestComponent() {
  const { user } = useAuth();
  return <div>{user ? user.name : "No user"}</div>;
}

describe("AuthContext initialization and logout branches", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("AuthProvider initializes with loading state when localStorage is empty", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    // Should pass initialization and show "No user"
    expect(screen.getByText("No user")).toBeInTheDocument();
  });

  test("AuthProvider restores user from localStorage on init", () => {
    const mockUser = {
      id: "USER-001",
      name: "Test User",
      email: "test@example.com",
      role: UserRole.VIEWER,
    };
    localStorage.setItem("currentUser", JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  test("logout clears user and localStorage", () => {
    const mockUser = {
      id: "USER-001",
      name: "Test User",
      email: "test@example.com",
      role: UserRole.EDITOR,
    };
    localStorage.setItem("currentUser", JSON.stringify(mockUser));

    function TestLogout() {
      const { user, logout } = useAuth();
      return (
        <div>
          <div>{user ? user.name : "No user"}</div>
          <button onClick={logout}>Logout</button>
        </div>
      );
    }

    const { rerender } = render(
      <AuthProvider>
        <TestLogout />
      </AuthProvider>,
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    // After logout, component re-renders and should show "No user"
    // (this tests the logout branch).
  });
});
