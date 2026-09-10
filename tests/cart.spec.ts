import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import testData from '../data/testData.json';

test.describe('Cart Module', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  // TC-11
  test('TC-11: should update cart count correctly when adding multiple products', async () => {
    await productsPage.addProductToCartByName(testData.products.backpack);
    await productsPage.addProductToCartByName(testData.products.bikeLight);
    await productsPage.addProductToCartByName(testData.products.boltTShirt);
    await productsPage.expectCartCount('3');
  });

  // TC-12
  test('TC-12: should update cart total when a product is removed', async () => {
    await productsPage.addProductToCartByName(testData.products.backpack);
    await productsPage.addProductToCartByName(testData.products.bikeLight);
    await productsPage.goToCart();
    await cartPage.removeItemByName(testData.products.bikeLight);
    await cartPage.expectItemAbsent(testData.products.bikeLight);
    expect(await cartPage.getItemCount()).toBe(1);
  });

  // TC-13
  test('TC-13: should persist cart contents after page refresh', async ({ page }) => {
    await productsPage.addProductToCartByName(testData.products.backpack);
    await page.reload();
    await productsPage.expectCartCount('1');
  });

  // TC-14
  test('TC-14: should reflect correct items when navigating to cart page', async () => {
    await productsPage.addProductToCartByName(testData.products.backpack);
    await productsPage.addProductToCartByName(testData.products.boltTShirt);
    await productsPage.goToCart();
    const names = await cartPage.getItemNames();
    expect(names).toContain(testData.products.backpack);
    expect(names).toContain(testData.products.boltTShirt);
    expect(names.length).toBe(2);
  });
});
