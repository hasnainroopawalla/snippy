import { test, expect } from "@playwright/test";

test.describe("New Snippet Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Navbar", async ({ page }) => {
    await expect(page).toHaveTitle(/Snippy/);

    await expect(page.getByTestId("navbar-new-anchor")).toBeVisible();
    // await expect(page.getByTestId("navbar-find-anchor")).toBeVisible();
    await expect(page.getByTestId("navbar-help-anchor")).toBeVisible();
    await expect(page.getByTestId("theme-switcher")).toBeVisible();
  });

  test("Compose Toolbar", async ({ page }) => {
    await expect(page.getByTestId("validity-select-label")).toHaveText(
      "Validity",
    );
    await expect(page.getByTestId("validity-select-button")).toHaveText(
      "10 minutes",
    );
    await expect(page.getByTestId("privacy-select-label")).toHaveText(
      "Privacy",
    );
    await expect(page.getByTestId("privacy-select-button")).toHaveText(
      "Public",
    );
  });

  test("Compose Toolbar - Validity options", async ({ page }) => {
    await page.getByTestId("validity-select-button").click();

    await expect(
      page.getByTestId("validity-select-label-10 minutes").first(),
    ).toBeVisible();
    await expect(
      page.getByTestId("validity-select-label-1 hour"),
    ).toBeVisible();
    await expect(page.getByTestId("validity-select-label-1 day")).toBeVisible();
  });

  test("Compose Toolbar - Privacy options", async ({ page }) => {
    await page.getByTestId("privacy-select-button").click();

    await expect(
      page.getByTestId("privacy-select-label-Public").first(),
    ).toBeVisible();
    await expect(
      page.getByTestId("privacy-select-label-Private"),
    ).toBeVisible();
  });
});
