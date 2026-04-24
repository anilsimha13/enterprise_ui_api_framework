import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/auth/login");
  await page.locator("#email").fill("admin@practicesoftwaretesting.com");
  await page.locator("#password").fill("welcome01");
  await page.locator('//input[@value="Login"]').click();
  await page.locator('[data-test="nav-home"]').click();
  await page.locator('[data-test="search-query"]').fill("hammer");
  await page.locator('[data-test="search-submit"]').click();

  await page.locator('[data-test="search-query"]').fill("Hammer");
  await page.locator('[data-test="search-submit"]').click();
  await page
    .locator('[data-test="product-01KPYKEYFTY81YXBF3DEZS1YV0"]')
    .click();
  await expect(page.locator('[data-test="product-name"]')).toContainText(
    "Hammer",
  );
  await expect(page.locator('[data-test="add-to-favorites"]')).toContainText(
    "Add to favourites",
  );
  await expect(page.locator('[data-test="add-to-cart"]')).toContainText(
    "Add to cart",
  );
  await expect(page.locator('[data-test="add-to-compare"]')).toContainText(
    "Compare",
  );
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.getByLabel("Product added to shopping")).toContainText(
    "Product added to shopping cart.",
  );
  await page.locator('[data-test="nav-cart"]').click();
  await expect(page.locator('[data-test="product-title"]')).toContainText(
    "Hammer",
  );
  await page.close();
});
