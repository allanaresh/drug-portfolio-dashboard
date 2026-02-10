import React from "react";
import { renderHook, act } from "@testing-library/react";
import { DataProvider, useData } from "@/lib/DataContext";
import { DevelopmentPhase, TherapeuticArea } from "@/types";

function wrapper({ children }: { children: React.ReactNode }) {
  return <DataProvider>{children}</DataProvider>;
}

describe("DataContext branch coverage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("getFilteredPrograms filters by all three filters combined", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const sample = result.current.programs[0];

    // Set filters to combination of all three
    act(() => {
      result.current.setFilters({
        therapeuticAreas: [sample.therapeuticArea],
        phases: [sample.phase],
        priorities: [sample.priority],
        searchQuery: "",
      });
    });

    const filtered = result.current.getFilteredPrograms();
    expect(filtered.length).toBeGreaterThanOrEqual(1);
    expect(
      filtered.every((p) => p.therapeuticArea === sample.therapeuticArea),
    ).toBe(true);
    expect(filtered.every((p) => p.phase === sample.phase)).toBe(true);
    expect(filtered.every((p) => p.priority === sample.priority)).toBe(true);
  });

  test("getFilteredPrograms with multiple therapeutic areas", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const areas = [TherapeuticArea.ONCOLOGY, TherapeuticArea.NEUROLOGY];

    act(() => {
      result.current.setFilters({
        therapeuticAreas: areas,
        phases: [],
        priorities: [],
        searchQuery: "",
      });
    });

    const filtered = result.current.getFilteredPrograms();
    expect(filtered.every((p) => areas.includes(p.therapeuticArea))).toBe(true);
  });

  test("getFilteredPrograms with multiple phases", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const phases = [DevelopmentPhase.PHASE_1, DevelopmentPhase.PHASE_2];

    act(() => {
      result.current.setFilters({
        therapeuticAreas: [],
        phases,
        priorities: [],
        searchQuery: "",
      });
    });

    const filtered = result.current.getFilteredPrograms();
    expect(filtered.every((p) => phases.includes(p.phase))).toBe(true);
  });

  test("getFilteredPrograms with searchQuery matching targetIndication", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const sample = result.current.programs[0];
    const query = sample.targetIndication.substring(0, 5);

    act(() => {
      result.current.setFilters({
        therapeuticAreas: [],
        phases: [],
        priorities: [],
        searchQuery: query,
      });
    });

    const filtered = result.current.getFilteredPrograms();
    expect(filtered.length).toBeGreaterThanOrEqual(1);
  });

  test("getProgramDetail returns undefined for nonexistent ID", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const detail = result.current.getProgramDetail("NONEXISTENT-ID");
    expect(detail).toBeUndefined();
  });
});
