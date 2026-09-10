import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../data/testData.json';

test.describe('Login Module', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // TC-01
  test('TC-01: should log in successfully with valid credentials', async () => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await loginPage.expectLoginSuccess();
  });

  // TC-02
  test('TC-02: should show error for invalid password', async () => {
    await loginPage.login(testData.invalidLogins[0].username, testData.invalidLogins[0].password);
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  // TC-03
  test('TC-03: should show error for empty username and password', async () => {
    await loginPage.login(testData.invalidLogins[1].username, testData.invalidLogins[1].password);
    await loginPage.expectErrorMessage('Username is required');
  });

  // TC-04
  test('TC-04: should block a locked-out user from logging in', async () => {
    await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password);
    await loginPage.expectErrorMessage('locked out');
  });
});
