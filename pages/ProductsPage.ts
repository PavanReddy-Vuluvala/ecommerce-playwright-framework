import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly productPrices: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.productPrices = page.locator('.inventory_item_price');
    this.productNames = page.locator('.inventory_item_name');
  }

  async getProductCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addProductToCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.locator('button', { hasText: 'Add to cart' }).click();
  }

  async removeProductFromCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async openProductDetails(name: string) {
    await this.page.locator('.inventory_item_name', { hasText: name }).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getAllPrices(): Promise<number[]> {
    const texts = await this.productPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async getAllNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async expectCartCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async expectCartBadgeHidden() {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
