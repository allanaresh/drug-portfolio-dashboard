import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/AuthContext";

describe("Header extra coverage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("login as Editor and Admin flows", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    const loginBtn = screen.getByText("Login");
    // Open role menu
    await act(async () => {
      await user.click(loginBtn);
    });

    const loginAsEditor = screen.getByText(/Login as Editor/i);
    await act(async () => {
      await user.click(loginAsEditor);
    });

    // Editor user appears
    expect(await screen.findByText(/Editor User/i)).toBeInTheDocument();

    // Logout
    const logout = screen.getByText(/Logout/i);
    await act(async () => {
      await user.click(logout);
    });

    // Re-open and login as Admin
    await act(async () => {
      await user.click(screen.getByText("Login"));
    });
    const loginAsAdmin = screen.getByText(/Login as Admin/i);
    await act(async () => {
      await user.click(loginAsAdmin);
    });

    expect(await screen.findByText(/Admin User/i)).toBeInTheDocument();
  });
});
