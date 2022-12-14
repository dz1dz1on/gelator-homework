import { test, expect } from "@playwright/test";
import { LOGIN_USER } from "../data/user.data";
import { DashboardPage } from "../page-objects/pages/dashboard.page";
import { LoginPage } from "../page-objects/pages/login.page";

test.describe("Login", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.load();
  });

  test("should login correctly to the account", async () => {
    await loginPage.loginToAccount(LOGIN_USER.name, LOGIN_USER.password);

    await dashboardPage.waitForPageLoad();
    await expect(dashboardPage.$.quickLaunchPanel).toBeVisible();
  });

  test("should not login when wrong data is passed", async () => {
    const testData = {
      wrongUserName: "asdsadasda",
      wrongPassword: "wrongPassword",
    };

    await loginPage.loginToAccount(
      testData.wrongUserName,
      testData.wrongPassword
    );

    await expect(loginPage.$.errorMessage).toBeVisible();
  });
});
