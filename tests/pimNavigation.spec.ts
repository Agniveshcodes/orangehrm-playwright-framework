import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { credentials } from "../test-data/credentials";
import { PIMPage } from "../pages/PIMPage";

test("user can navigate to PIM module", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const pimPage = new PIMPage(page);

  await loginPage.loginAndNavigate(
    credentials.admin.username,
    credentials.admin.password,
  );

  await dashboardPage.navigateToPIM();

  await pimPage.verifyPIMPageLoaded();
});
