import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import testData from '../data/testData.json';

test.describe('Product Details Module', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    productsPage = new ProductsPage(page);
  });

  // TC-09
  test('TC-09: should display correct product name and price on details page', async ({ page }) => {
    await productsPage.openProductDetails(testData.products.backpack);
    await expect(page.locator('.inventory_details_name')).toHaveText(testData.products.backpack);
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).not.toBeEmpty();
  });

  // TC-10
  test('TC-10: should add the correct product to cart from details page', async ({ page }) => {
    await productsPage.openProductDetails(testData.products.bikeLight);
    await page.locator('button', { hasText: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
