import { test, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import testData from '../data/testData.json';

test.describe('Session & Responsive UI Module', () => {
  // TC-19
  test('TC-19: should log out and clear session, redirecting to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    const productsPage = new ProductsPage(page);
    await productsPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.goto('/inventory.html'); // attempt direct access after logout
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  // TC-20
  test('TC-20: should render menu and cart icon correctly on a mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPhone 12'] });
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    const productsPage = new ProductsPage(page);
    await expect(productsPage.menuButton).toBeVisible();
    await expect(productsPage.cartIcon).toBeVisible();

    await context.close();
  });
});
