import { test, expect } from "@playwright/test";
import { LOGIN_USER } from "../data/user.data";
import { DashboardPage } from "../page-objects/pages/dashboard.page";
import { DirectoryPage } from "../page-objects/pages/directory/directory.page";
import { LoginPage } from "../page-objects/pages/login.page";

test.describe("Directory", () => {
  let loginPage: LoginPage;
  let directoryPage: DirectoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    directoryPage = new DirectoryPage(page);

    await loginPage.load();
    await loginPage.loginToAccount(LOGIN_USER.name, LOGIN_USER.password);
    await directoryPage.load();
  });

  test("should filter users via job title and location", async () => {
    const testData = {
      canadaIndex: 1,
      locationText: "Canada",
      jobTitle: "QA Engineer",
      jobTitleUserIndex: 0,
    };

    const initialNoOfUsers = await directoryPage.$.userTable.getNumberOfUsers();

    await directoryPage.$.searchDirectory.searchLocation(testData.canadaIndex);

    const locationNoOfUsers =
      await directoryPage.$.userTable.getNumberOfUsers();

    await expect(
      await directoryPage.$.searchDirectory.getSelectedValueOfLocation()
    ).toEqual(testData.locationText);
    await expect(locationNoOfUsers).toBeLessThan(initialNoOfUsers);

    await directoryPage.$.searchDirectory.searchJobTitle(testData.jobTitle);

    const jobTitleNoOfUsers =
      await directoryPage.$.userTable.getNumberOfUsers();

    // Checking number of users after applying two filters
    await expect(jobTitleNoOfUsers).toBeLessThan(locationNoOfUsers);
    await expect(
      await directoryPage.$.searchDirectory.getSelectedValueOfJobTitle()
    ).toEqual(testData.jobTitle);
    await expect(
      directoryPage.$.userTable.$.jobTitle(testData.jobTitleUserIndex)
    ).toContainText(testData.jobTitle);
  });
});
