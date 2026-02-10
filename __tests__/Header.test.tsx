import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/AuthContext";

describe("Header", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("shows Login button when no user and allows login flow", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    const loginBtn = screen.getByText("Login");
    expect(loginBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(loginBtn);
    });

    const loginAsViewer = screen.getByText(/Login as Viewer/i);
    expect(loginAsViewer).toBeInTheDocument();

    await act(async () => {
      await user.click(loginAsViewer);
    });

    // After login, user name should appear
    const userName = await screen.findByText(/Viewer User/i);
    expect(userName).toBeInTheDocument();
    const logout = screen.getByText(/Logout/i);
    expect(logout).toBeInTheDocument();

    // Click logout and ensure Login button returns
    await act(async () => {
      await user.click(logout);
    });
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
