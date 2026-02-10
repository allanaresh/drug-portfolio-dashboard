import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { UserRole } from "@/types";

function wrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe("AuthContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("login sets user and localStorage, canEdit behaves by role", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login(UserRole.EDITOR as any);
    });

    expect(result.current.user).not.toBeNull();
    expect(window.localStorage.getItem("currentUser")).not.toBeNull();
    expect(result.current.canEdit()).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(window.localStorage.getItem("currentUser")).toBeNull();
  });
});
