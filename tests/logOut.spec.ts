import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { credentials } from "../test-data/credentials";

test("user can logout successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.loginAndNavigate(
    credentials.admin.username,
    credentials.admin.password,
  );

  await dashboardPage.verifyDashboardLoaded();

  await dashboardPage.logout();

  await loginPage.verifyLoginPageLoaded();
});
