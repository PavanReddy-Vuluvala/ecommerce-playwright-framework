import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../data/testData.json';

test.describe('Checkout Module', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await productsPage.addProductToCartByName(testData.products.backpack);
    await productsPage.addProductToCartByName(testData.products.bikeLight);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  // TC-15
  test('TC-15: should show validation error when required checkout fields are empty', async () => {
    const { firstName, lastName, postalCode } = testData.shippingInfo.missingFirstName;
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutPage.expectValidationError('First Name is required');
  });

  // TC-16
  test('TC-16: should display order summary matching cart items and total', async ({ page }) => {
    const { firstName, lastName, postalCode } = testData.shippingInfo.valid;
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);

    const itemNames = await page.locator('.inventory_item_name').allTextContents();
    expect(itemNames).toContain(testData.products.backpack);
    expect(itemNames).toContain(testData.products.bikeLight);

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    expect(Math.round((subtotal + tax) * 100) / 100).toBeCloseTo(total, 2);
  });

  // TC-17
  test('TC-17: should complete order successfully with valid shipping details', async () => {
    const { firstName, lastName, postalCode } = testData.shippingInfo.valid;
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  // TC-18
  test('TC-18: should calculate tax and total correctly based on subtotal', async () => {
    const { firstName, lastName, postalCode } = testData.shippingInfo.valid;
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    expect(total).toBeGreaterThan(subtotal);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });
});
