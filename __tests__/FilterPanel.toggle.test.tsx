import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterPanel from "@/components/FilterPanel";
import { DataProvider } from "@/lib/DataContext";

describe("FilterPanel toggle branches", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("toggle on and off therapeutic area and phase", async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <FilterPanel />
      </DataProvider>,
    );

    const oncology = screen.getByText("Oncology");
    // toggle on
    await act(async () => {
      await user.click(oncology);
    });
    // toggle off
    await act(async () => {
      await user.click(oncology);
    });

    const phase1 = screen.getByText("Phase 1");
    // toggle on
    await act(async () => {
      await user.click(phase1);
    });
    // toggle off
    await act(async () => {
      await user.click(phase1);
    });

    // No 'Clear all' should be visible after toggling off
    expect(screen.queryByText(/Clear all/)).not.toBeInTheDocument();
  });
});
