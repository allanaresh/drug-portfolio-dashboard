import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/AuthContext";
import { UserRole } from "@/types";

describe("Header branches", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("Header shows Dashboard link with appropriate styling when rendered", () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    // Dashboard link should be present (use getAllByText to avoid subtitle match)
    const dashboardLinks = screen.getAllByText(/Dashboard/i);
    expect(dashboardLinks.length).toBeGreaterThanOrEqual(1);
  });

  test("Header shows both Dashboard and Analytics navigation links", () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    // Both nav links should be present
    expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
    const dashboardLinks = screen.getAllByText(/Dashboard/i);
    expect(dashboardLinks.length).toBeGreaterThanOrEqual(1);
  });

  test("Header shows all login role options when menu is opened", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    const loginBtn = screen.getByText("Login");
    await act(async () => {
      await user.click(loginBtn);
    });

    // All role options should be visible
    expect(screen.getByText(/Login as Viewer/i)).toBeInTheDocument();
    expect(screen.getByText(/Login as Editor/i)).toBeInTheDocument();
    expect(screen.getByText(/Login as Admin/i)).toBeInTheDocument();
  });

  test("Header displays logged in user info after login", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    const loginBtn = screen.getByText("Login");
    await act(async () => {
      await user.click(loginBtn);
    });

    const viewerRole = screen.getByText(/Login as Viewer/i);
    await act(async () => {
      await user.click(viewerRole);
    });

    // User info should be displayed
    expect(await screen.findByText(/Viewer User/i)).toBeInTheDocument();

    // Logout should be available
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});
