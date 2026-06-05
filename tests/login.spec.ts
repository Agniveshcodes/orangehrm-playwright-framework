import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { credentials } from "../test-data/credentials";
import { DashboardPage } from "../pages/DashboardPage";

test("user can login to OrangeHRM", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.loginAndNavigate(
    credentials.admin.username,
    credentials.admin.password,
  );

  await dashboardPage.verifyDashboardLoaded();
});
