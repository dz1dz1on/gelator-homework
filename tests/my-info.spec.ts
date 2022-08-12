import { test, expect } from "@playwright/test";
import { futureDate } from "../data/date.data";
import { TestFiles } from "../data/test-file/test-file";
import { LOGIN_USER, User } from "../data/user.data";
import { LoginPage } from "../page-objects/pages/login.page";
import { MyInfoPage } from "../page-objects/pages/my-info/my-info.page";

test.describe("My info", () => {
  let loginPage: LoginPage;
  let myInfoPage: MyInfoPage;
  let user: User;

  test.beforeEach(async ({ page }) => {
    user = User.personalDetailsUser();
    loginPage = new LoginPage(page);
    myInfoPage = new MyInfoPage(page);

    await loginPage.load();
    await loginPage.loginToAccount(LOGIN_USER.name, LOGIN_USER.password);
    await myInfoPage.load();
  });
  // This test will fail intentionally because in this app it is possible to be born in the future.
  test("should be able to update data in personal details, set future birth date", async ({}) => {
    const testData = {
      expectedProfileName: `${user.firstName} ${user.middleName} ${user.lastName}`,
    };
    await myInfoPage.$.personalDetails.updateBasicPersonalDetails(user);

    await myInfoPage.$.personalDetails.setDateOfBirth(futureDate);
    await myInfoPage.$.personalDetails.$.saveOrEdditButton.click();

    await expect(myInfoPage.$.personalDetails.$.profileName).toHaveText(
      testData.expectedProfileName
    );

    const savedPersonalDayOfBirth =
      await myInfoPage.$.personalDetails.$.personalDayOfBirthInput.inputValue();

    await expect(savedPersonalDayOfBirth).not.toEqual(futureDate);
  });

  test("should be able to upload an image", async ({ page }) => {
    await myInfoPage.$.attachmets.uploadFile(TestFiles.jpgArtwork.path);

    await expect(
      myInfoPage.$.attachmets.$.attachmentTable.$.fileName(
        TestFiles.jpgArtwork.name
      )
    ).toBeVisible();
  });
});
