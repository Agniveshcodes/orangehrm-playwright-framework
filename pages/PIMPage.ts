import { Page, Locator, expect } from "@playwright/test";

export class PIMPage {
  readonly page: Page;
  readonly pimHeading: Locator;
  readonly addEmployeeLink: Locator;
  readonly addEmployeeHeading: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly personalDetailsHeading: Locator;
  readonly employeeIdInput: Locator;
  readonly employeeListLink: Locator;
  readonly employeeNameSearchInput: Locator;
  readonly searchButton: Locator;
  readonly deleteEmployeeButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly recordFoundText: Locator;
  readonly noRecordsFoundText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pimHeading = page.getByRole("heading", {
      name: "PIM",
    });
    this.addEmployeeLink = page.getByRole("link", {
      name: "Add Employee",
    });

    this.addEmployeeHeading = page.getByRole("heading", {
      name: "Add Employee",
    });
    this.firstNameInput = page.getByRole("textbox", {
      name: "First Name",
    });

    this.middleNameInput = page.getByRole("textbox", {
      name: "Middle Name",
    });

    this.lastNameInput = page.getByRole("textbox", {
      name: "Last Name",
    });

    this.saveButton = page.getByRole("button", {
      name: "Save",
    });
    this.personalDetailsHeading = page.getByRole("heading", {
      name: "Personal Details",
    });
    this.employeeIdInput = page
      .locator('//input[@class="oxd-input oxd-input--active"]')
      .nth(1);
    this.employeeListLink = page.getByRole("link", { name: "Employee List" });
    this.employeeNameSearchInput = page
      .getByRole("textbox", { name: "Type for hints..." })
      .first();
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.deleteEmployeeButton = page.locator("i.oxd-icon.bi-trash");

    this.confirmDeleteButton = page.getByRole("button", {
      name: /Yes, Delete/,
    });
    this.recordFoundText = page.getByText(/Record Found/);
    this.noRecordsFoundText = page.getByText(/No Records Found/);
  }

  async verifyPIMPageLoaded() {
    await expect(this.pimHeading).toBeVisible({
      timeout: 10000,
    });
  }

  async navigateToAddEmployee() {
    await this.addEmployeeLink.click();

    await expect(this.addEmployeeHeading).toBeVisible({
      timeout: 10000,
    });
  }

  async verifyAddEmployeePageLoaded() {
    await expect(this.addEmployeeHeading).toBeVisible({
      timeout: 10000,
    });
  }

  async addEmployee(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);

    await this.employeeIdInput.fill(employeeId);

    await this.saveButton.click();
  }
  async verifyEmployeeCreated() {
    await expect(this.page).toHaveURL(/viewPersonalDetails/, {
      timeout: 60000,
    });

    await expect(this.personalDetailsHeading).toBeVisible({
      timeout: 10000,
    });
  }
  async navigateToEmployeeList() {
    await this.employeeListLink.click();
  }

  async searchEmployee(employeeName: string) {
    await this.employeeNameSearchInput.fill(employeeName);
    await this.searchButton.click();
  }
  async verifyEmployeeInResults(employeeName: string) {
    await expect(this.page.getByText(employeeName)).toBeVisible({
      timeout: 15000,
    });
  }
  async deleteEmployee() {
    await this.deleteEmployeeButton.click();
  }

  async confirmDelete() {
    await this.confirmDeleteButton.click();
  }

  // async debugAfterSave() {
  //   console.log("Current URL:", this.page.url());

  //   const pageText = await this.page.locator("body").innerText();

  //   console.log(pageText);
  // }

  async verifyEmployeeDeleted() {
    await this.page.waitForTimeout(3000);

    await expect(this.page.getByText("No Records Found")).toBeVisible({
      timeout: 10000,
    });
  }
}
