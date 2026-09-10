import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeItemByName(name: string) {
    const item = this.page.locator('.cart_item', { hasText: name });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async expectItemPresent(name: string) {
    await expect(this.page.locator('.cart_item', { hasText: name })).toBeVisible();
  }

  async expectItemAbsent(name: string) {
    await expect(this.page.locator('.cart_item', { hasText: name })).toHaveCount(0);
  }
}
