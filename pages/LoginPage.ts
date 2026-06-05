import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.invalidCredentialsMessage = page.getByText("Invalid credentials");
    this.welcomeMessage = page.getByText("Welcome");
  }

  async navigate() {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      },
    );
  }

  async loginAndNavigate(username: string, password: string) {
    await this.navigate();
    await this.login(username, password);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyInvalidLoginMessage() {
    await expect(this.invalidCredentialsMessage).toBeVisible();
  }
  async verifyLoginPageLoaded() {
    await expect(this.usernameInput).toBeVisible({
      timeout: 10000,
    });
  }

  async verifyWelcomeMessage() {
    await expect(this.welcomeMessage).toBeVisible({
      timeout: 10000,
    });
  }
}
