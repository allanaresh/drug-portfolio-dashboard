import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { UserRole } from "@/types";

function wrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe("AuthContext branches", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("canEdit returns correct values for roles", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login(UserRole.VIEWER);
    });
    expect(result.current.canEdit()).toBe(false);

    act(() => {
      result.current.login(UserRole.EDITOR);
    });
    expect(result.current.canEdit()).toBe(true);

    act(() => {
      result.current.login(UserRole.ADMIN);
    });
    expect(result.current.canEdit()).toBe(true);
  });
});
