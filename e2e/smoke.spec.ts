import { expect, test } from "@playwright/test";

test("landing page loads", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Signal/);
});

test("chapter page loads", async ({ page }) => {
	await page.goto("/chapter/the-test/");
	await expect(page.locator("body")).not.toContainText("404");
});

test("chapter navigation works", async ({ page }) => {
	await page.goto("/chapter/the-signal/");
	await expect(page.locator("body")).not.toContainText("404");
});
