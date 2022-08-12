import { test, expect } from "@playwright/test";
import { LOGIN_USER } from "../data/user.data";
import { LoginPage } from "../page-objects/pages/login.page";
import { RecruitmentPage } from "../page-objects/pages/recruitment/recruitment.page";

test.describe("Login", () => {
  let loginPage: LoginPage;
  let recruitmentPage: RecruitmentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    recruitmentPage = new RecruitmentPage(page);

    await loginPage.load();
    await loginPage.loginToAccount(LOGIN_USER.name, LOGIN_USER.password);
    await recruitmentPage.load();
  });

  test("should be able to add new vacancy and check it existence in the vacancy table", async ({}) => {
    const testData = { vacancyName: "Gelato Vacancy", noOfPositions: 1 };
    await recruitmentPage.addVacancy(
      "QA Engineer",
      testData.vacancyName,
      testData.noOfPositions
    );
    // Go back to see if the record is added to the table
    await recruitmentPage.load();
    await expect(
      recruitmentPage.$.vacancyTable.$.vacancyName(testData.vacancyName)
    ).toBeVisible();
  });
});
