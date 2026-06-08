import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { PIMPage } from "../pages/PIMPage";
import { credentials } from "../test-data/credentials";
import { generateEmployee } from "../test-data/employeeFactory";

test("user can add and search employee", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const pimPage = new PIMPage(page);

  const employeeData = generateEmployee();

  await loginPage.loginAndNavigate(
    credentials.admin.username,
    credentials.admin.password,
  );

  await dashboardPage.navigateToPIM();

  await pimPage.verifyPIMPageLoaded();

  await pimPage.navigateToAddEmployee();

  await pimPage.verifyAddEmployeePageLoaded();

  console.log("Employee Data:", employeeData);

  await pimPage.addEmployee(
    employeeData.firstName,
    employeeData.middleName,
    employeeData.lastName,
    employeeData.employeeId,
  );

  await pimPage.verifyEmployeeCreated();

  await pimPage.navigateToEmployeeList();

  await pimPage.searchEmployee(employeeData.firstName);
  
  await pimPage.verifyEmployeeInResults(employeeData.firstName);

  await pimPage.deleteEmployee();

  await pimPage.confirmDelete();

  await pimPage.searchEmployee(employeeData.firstName);

  await pimPage.verifyEmployeeDeleted();
});
