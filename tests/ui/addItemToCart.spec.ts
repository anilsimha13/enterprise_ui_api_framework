import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/auth/login");
  await page.locator("#email").fill("admin@practicesoftwaretesting.com");
  await page.locator("#password").fill("welcome01");
  await page.locator('//input[@value="Login"]').click();
  await page.waitForTimeout(5_000);
  await page.locator('[data-test="nav-home"]').click();
  await page.locator('[data-test="search-query"]').fill("Hammer");
  await page.locator('[data-test="search-submit"]').click();
  const itemNameInItemsPage = page.locator(
    '//h5[contains(text(),"Claw Hammer with Fiberglass Handle")]/parent::div/parent::a',
  );
  const productName = await itemNameInItemsPage.textContent();
  await itemNameInItemsPage.click();
  const productNameText = await page
    .locator('[data-test="product-name"]')
    .textContent();
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

  //---------------------------//
  await page.locator('[data-test="nav-cart"]').click();
  await expect(page.locator('[data-test="product-title"]')).toContainText(
    "Hammer",
  );
  await page.locator('[data-test="proceed-1"]').click();
  const loggedInName = page.locator("//p[contains(text(),'John Doe')]");
  await expect(loggedInName).toContainText("logged in");
  await page.locator('[data-test="proceed-2"]').click();
  await page.locator("#country").selectOption("United States of America (the)");
  await page.locator("#postal_code").fill(faker.location.zipCode());
  await page.locator("#house_number").fill(faker.location.buildingNumber());
  await page.locator("#street").fill(faker.location.street());
  await page.locator("#city").fill(faker.location.city());
  await page.locator("#state").fill(faker.location.state());
  await page.locator('[data-test="proceed-3"]').click();
  await page.locator("#payment-method").selectOption("Credit Card");
  await page.locator("#credit_card_number").fill("4242-4242-4242-4242");
  await page.locator("#expiration_date").fill("01/2030");

  await page.locator("#cvv").fill(faker.finance.creditCardCVV());

  await page.locator("#card_holder_name").fill(faker.person.fullName());

  await page.locator('[data-test="finish"]').click();
});

test.skip("completing payment for items in cart", async ({ page }) => {
  await page.locator('[data-test="nav-cart"]').click();
  await expect(page.locator('[data-test="product-title"]')).toContainText(
    "Hammer",
  );
  await page.locator('[data-test="proceed-1"]').click();
  const loggedInName = page.locator("//p[contains(text(),'John Doe')]");
  await expect(loggedInName).toContainText("logged in");
  await page.locator('[data-test="proceed-2"]').click();
  await page.locator("#country").selectOption("United States of America (the)");
  await page.locator("#postal_code").fill(faker.location.zipCode());
  await page.locator("#house_number").fill(faker.location.buildingNumber());
  await page.locator("#street").fill(faker.location.street());
  await page.locator("#city").fill(faker.location.city());
  await page.locator("#state").fill(faker.location.state());
  await page.locator('[data-test="proceed-3"]').click();
  await page.locator("#payment-method").selectOption("Credit Card");
  await page.locator("#credit_card_number").fill("4242-4242-4242-4242");
  await page.locator("#expiration_date").fill("01/2030");
  await page.locator("#cvv").fill(faker.finance.creditCardCVV());
  await page.locator("#card_holder_name").fill(faker.person.fullName());
  await page.locator('[data-test="finish"]').click();
});
