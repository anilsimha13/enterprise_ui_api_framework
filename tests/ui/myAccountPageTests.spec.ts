import { test, expect } from "@playwright/test";
import fs from "fs";

test.skip("test", async ({ page }) => {
  const config = JSON.parse(
    fs.readFileSync("./credentials/auth-token.json", "utf8"),
  );
  const access_token = `${config.token}`;
  console.log(access_token);
  await page.goto("https://practicesoftwaretesting.com/");
  await page.evaluate((token) => {
    window.localStorage.setItem("auth-token", token);
  }, access_token);
  await page.goto("https://practicesoftwaretesting.com/account");
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account",
  );
  await page.close();

  // await page.locator('[data-test="nav-menu"]').click();
  // await page.locator('[data-test="nav-sign-out"]').click();
});
