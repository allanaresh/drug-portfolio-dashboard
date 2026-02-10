import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/lib/AuthContext";

// Skipped: causes invalid hook-call when mocking next/navigation in isolation
describe.skip("Header pathname branches (skipped)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.resetModules();
  });
  test("renders analytics link active when pathname is /analytics", () => {
    // Mock both next/navigation and the AuthContext so we can import Header in isolation
    jest.isolateModules(() => {
      jest.doMock("next/navigation", () => ({
        usePathname: () => "/analytics",
      }));
      jest.doMock("@/lib/AuthContext", () => ({
        useAuth: () => ({
          user: null,
          login: () => {},
          logout: () => {},
          canEdit: () => false,
        }),
      }));
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Header = require("@/components/Header").default;
      render(<Header />);
      expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
    });
  });
});
