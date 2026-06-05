import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { credentials } from '../test-data/credentials';

test('user can navigate to Add Employee page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const pimPage = new PIMPage(page);

  await loginPage.loginAndNavigate(
    credentials.admin.username,
    credentials.admin.password
  );

  await dashboardPage.navigateToPIM();

  await pimPage.verifyPIMPageLoaded();

  await pimPage.navigateToAddEmployee();

  await pimPage.verifyAddEmployeePageLoaded();
});