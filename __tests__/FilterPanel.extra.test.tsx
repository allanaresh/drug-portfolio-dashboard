import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterPanel from "@/components/FilterPanel";
import { DataProvider } from "@/lib/DataContext";

describe("FilterPanel extra coverage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("toggles therapeutic area and phase and clears filters", async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <FilterPanel />
      </DataProvider>,
    );

    // Toggle a therapeutic area (Oncology)
    const oncology = screen.getByText("Oncology");
    await act(async () => {
      await user.click(oncology);
    });

    // Toggle a phase (Phase 1)
    const phase1 = screen.getByText("Phase 1");
    await act(async () => {
      await user.click(phase1);
    });

    // Now 'Clear all' should be visible
    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    // Click Clear all and ensure it disappears
    const clear = screen.getByText(/Clear all/);
    await act(async () => {
      await user.click(clear);
    });

    expect(screen.queryByText(/Clear all/)).not.toBeInTheDocument();
  });
});
