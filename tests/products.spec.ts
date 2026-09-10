import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import testData from '../data/testData.json';

test.describe('Product Listing & Sorting Module', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    productsPage = new ProductsPage(page);
  });

  // TC-05
  test('TC-05: should load all products on the inventory page', async () => {
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  // TC-06
  test('TC-06: should sort products by price low to high', async () => {
    await productsPage.sortBy('lohi');
    const prices = await productsPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  // TC-07
  test('TC-07: should sort products by price high to low', async () => {
    await productsPage.sortBy('hilo');
    const prices = await productsPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  // TC-08
  test('TC-08: should sort products alphabetically A to Z', async () => {
    await productsPage.sortBy('az');
    const names = await productsPage.getAllNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });
});
