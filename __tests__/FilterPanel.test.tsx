import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterPanel from "@/components/FilterPanel";
import { DataProvider } from "@/lib/DataContext";

describe("FilterPanel", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("renders and toggles filters, shows Clear all", async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <FilterPanel />
      </DataProvider>,
    );

    // Type in search box
    const input = screen.getByPlaceholderText(/Search programs/i);
    await act(async () => {
      await user.type(input, "abc");
    });
    // After typing, 'Clear all' may not show until other filters, so check input value
    expect((input as HTMLInputElement).value).toBe("abc");

    // Toggle a priority checkbox
    const high = screen.getByText("High");
    await act(async () => {
      await user.click(high);
    });
    expect(screen.getByText(/Clear all/)).toBeInTheDocument();
  });
});
