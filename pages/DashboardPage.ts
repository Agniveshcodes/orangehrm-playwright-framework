import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly userDropdown: Locator;
  readonly logoutMenuItem: Locator;
  readonly pimMenu: Locator;
  readonly pimHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeading = page.getByRole("heading", {
      name: "Dashboard",
    });
    this.userDropdown = page.locator(".oxd-userdropdown-tab");
    this.logoutMenuItem = page.getByRole("menuitem", {
      name: "Logout",
    });
    this.pimMenu = page.getByRole("link", { name: "PIM" });

    this.pimHeading = page.getByRole("heading", {
      name: "PIM",
    });
  }

  async verifyDashboardLoaded() {
    await expect(this.dashboardHeading).toBeVisible({
      timeout: 10000,
    });

    await expect(this.page).toHaveURL(/dashboard/, {
      timeout: 10000,
    });
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutMenuItem.click();
  }

  async navigateToPIM() {
    await this.pimMenu.click();
  }

  async verifyPIMPageLoaded() {
    await expect(this.pimHeading).toBeVisible({
      timeout: 10000,
    });
  }
}
