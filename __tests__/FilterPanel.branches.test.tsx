import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterPanel from "@/components/FilterPanel";
import { DataProvider } from "@/lib/DataContext";

describe("FilterPanel all branches", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("toggles multiple therapeutic areas independently", async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <FilterPanel />
      </DataProvider>,
    );

    const oncology = screen.getByText("Oncology");
    const neurology = screen.getByText("Neurology");

    // Toggle on
    await act(async () => {
      await user.click(oncology);
    });
    // Toggle on second
    await act(async () => {
      await user.click(neurology);
    });

    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    // Toggle off first
    await act(async () => {
      await user.click(oncology);
    });

    // Neurology still selected, Clear all still visible
    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    // Toggle off second
    await act(async () => {
      await user.click(neurology);
    });

    // Now Clear all should disappear
    expect(screen.queryByText(/Clear all/)).not.toBeInTheDocument();
  });

  test("toggles multiple phases independently", async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <FilterPanel />
      </DataProvider>,
    );

    const phase1 = screen.getByText("Phase 1");
    const phase2 = screen.getByText("Phase 2");

    await act(async () => {
      await user.click(phase1);
    });

    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    await act(async () => {
      await user.click(phase2);
    });

    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    await act(async () => {
      await user.click(phase1);
    });

    expect(screen.getByText(/Clear all/)).toBeInTheDocument();
  });

  test("toggles multiple priorities independently", async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <FilterPanel />
      </DataProvider>,
    );

    const high = screen.getByText("High");
    const medium = screen.getByText("Medium");
    const low = screen.getByText("Low");

    await act(async () => {
      await user.click(high);
    });
    await act(async () => {
      await user.click(medium);
    });
    await act(async () => {
      await user.click(low);
    });

    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    // Clear all and verify all gone
    const clear = screen.getByText(/Clear all/);
    await act(async () => {
      await user.click(clear);
    });

    expect(screen.queryByText(/Clear all/)).not.toBeInTheDocument();
  });

  test("search query combined with checkbox filters", async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <FilterPanel />
      </DataProvider>,
    );

    const input = screen.getByPlaceholderText(/Search programs/i);

    // Enter search query
    await act(async () => {
      await user.type(input, "cancer");
    });

    // Should show Clear all
    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    // Add a checkbox filter
    const high = screen.getByText("High");
    await act(async () => {
      await user.click(high);
    });

    // Still showing Clear all
    expect(screen.getByText(/Clear all/)).toBeInTheDocument();

    // Clear all
    const clear = screen.getByText(/Clear all/);
    await act(async () => {
      await user.click(clear);
    });

    // Input value should be empty, no Clear all
    expect((input as HTMLInputElement).value).toBe("");
    expect(screen.queryByText(/Clear all/)).not.toBeInTheDocument();
  });
});
