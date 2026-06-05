import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../test-data/credentials';

test('user cannot login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    credentials.invalidUser.username,
    credentials.invalidUser.password
  );

  await loginPage.verifyInvalidLoginMessage();
});