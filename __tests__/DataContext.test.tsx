import React from "react";
import { renderHook, act } from "@testing-library/react";
import { DataProvider, useData } from "@/lib/DataContext";

function wrapper({ children }: { children: React.ReactNode }) {
  return <DataProvider>{children}</DataProvider>;
}

describe("DataContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("updateProgram updates programs and programDetails and getProgramDetail works", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    const originalPrograms = result.current.programs;
    expect(originalPrograms.length).toBeGreaterThan(0);

    const id = originalPrograms[0].id;
    act(() => {
      result.current.updateProgram(id, { name: "Updated Name" });
    });

    const updated = result.current.programs.find((p) => p.id === id);
    expect(updated?.name).toBe("Updated Name");

    const detail = result.current.getProgramDetail(id);
    expect(detail).toBeDefined();
    expect(detail?.name).toBe("Updated Name");
  });

  test("getFilteredPrograms filters by priorities, phases and searchQuery", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    // Start with no filters
    const all = result.current.getFilteredPrograms();
    expect(all.length).toBe(result.current.programs.length);

    // Filter by priority
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        priorities: ["High"],
      });
    });
    const highOnly = result.current.getFilteredPrograms();
    expect(highOnly.every((p) => p.priority === "High")).toBe(true);

    // Filter by search query (use code or name)
    const sample = result.current.programs[0];
    act(() => {
      result.current.setFilters({
        therapeuticAreas: [],
        phases: [],
        priorities: [],
        searchQuery: sample.code,
      });
    });
    const searched = result.current.getFilteredPrograms();
    expect(searched.length).toBeGreaterThanOrEqual(1);
  });
});
