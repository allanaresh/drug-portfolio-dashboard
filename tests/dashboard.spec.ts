import { test, expect } from "@playwright/test";

// helper to allow using a different host when running against CI or a preview
const BASE = process?.env?.BASE_URL || "http://localhost:3000";

test.describe("Dashboard application", () => {
  test.beforeEach(async ({ page }) => {
    // clear localStorage before each scenario so synthetic data is predictable
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto(BASE);
    // wait until the programs heading is visible so the data context has finished loading
    await expect(page.getByText(/^Programs/)).toBeVisible();
  });

  test("header renders and allows login", async ({ page }) => {
    // navigation links should always be present
    // ensure we pick the nav link rather than the logo (logo contains Dashboard in its accessible name)
    await expect(
      page.getByRole("link", { name: "Dashboard", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Analytics" })).toBeVisible();

    // click the login button and choose a role
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("button", { name: "Login as Viewer" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Login as Editor" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Login as Admin" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Login as Editor" }).click();

    // after logging in we should see the user role/name displayed
    // the name includes the word Editor, so require exact match for the role
    await expect(page.getByText("Editor", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("filter panel and search behave correctly", async ({ page }) => {
    // typing into the search input should update its value and show clear button
    const search = page.getByPlaceholder("Search programs...");
    await search.fill("a");
    await expect(search).toHaveValue("a");
    await expect(page.getByRole("button", { name: "Clear all" })).toBeVisible();

    // clear the filters
    await page.getByRole("button", { name: "Clear all" }).click();
    await expect(search).toHaveValue("");

    // toggle a therapeutic area checkbox by label text; use a known enum value
    const oncologyCheckbox = page.getByLabel("Oncology");
    await oncologyCheckbox.check();
    await expect(oncologyCheckbox).toBeChecked();

    // toggling again should uncheck and the clear button should disappear
    await oncologyCheckbox.uncheck();
    await expect(oncologyCheckbox).not.toBeChecked();
    await expect(page.getByRole("button", { name: "Clear all" })).toBeHidden();
  });

  test("switching between grid and table view", async ({ page }) => {
    const gridBtn = page.getByRole("button", { name: "Grid view" });
    const tableBtn = page.getByRole("button", { name: "Table view" });

    // default view is grid; clicking again should keep it active
    await gridBtn.click();
    await expect(gridBtn).toHaveClass(/bg-primary-100/);

    // switch to table view and expect a table element
    await tableBtn.click();
    await expect(tableBtn).toHaveClass(/bg-primary-100/);
    await expect(page.locator("table")).toBeVisible();
  });

  test("navigates to analytics page and shows summary", async ({ page }) => {
    await page.getByRole("link", { name: "Analytics" }).click();
    await expect(
      page.getByRole("heading", { name: "Portfolio Analytics" }),
    ).toBeVisible();
    // one of the summary cards should be present
    await expect(page.getByText(/Total Portfolio Value/)).toBeVisible();
  });

  test("clicking program card opens detail page", async ({ page }) => {
    // assume at least one card exists in grid view
    const firstCard = page
      .locator("a")
      .filter({ has: page.locator("h3") })
      .first();
    // capture the program title so we can validate after navigation
    const title = await firstCard.locator("h3").innerText();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    // ensure nav occurred
    await expect(page).toHaveURL(new RegExp(`${href}`));
    // program detail header should appear (skip the persistent site title)
    const headings = page.locator("h1");
    await expect(headings.last()).toBeVisible();
    await expect(headings.last()).toHaveText(title);
  });
});
