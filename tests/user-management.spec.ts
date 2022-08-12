import { test, expect } from "@playwright/test";
import { LOGIN_USER, User } from "../data/user.data";

import { LoginPage } from "../page-objects/pages/login.page";
import { SystemUserPage } from "../page-objects/pages/users/system-user.page";

test.describe("Admin", () => {
  let user: User;
  let loginPage: LoginPage;
  let systemUserPage: SystemUserPage;

  test.beforeEach(async ({ page }) => {
    user = User.DefaultUser();
    loginPage = new LoginPage(page);
    systemUserPage = new SystemUserPage(page);

    await loginPage.load();
    await loginPage.loginToAccount(LOGIN_USER.name, LOGIN_USER.password);
    await systemUserPage.load();
    await systemUserPage.performAddingOfUser(user, "C");
  });

  test("should be able to add a user and search him", async () => {
    const testData = {
      createdUserIndex: 0,
    };
    await systemUserPage.$.searchUserComponent.searchUserByUserName(
      user.userName
    );

    await expect(
      systemUserPage.$.userTable.$.userName(testData.createdUserIndex)
    ).toHaveText(user.userName);
  });

  test("should be able to remove created user", async () => {
    const testData = {
      createdUserIndex: 0,
      createdUserCheckboxIndex: 1,
      noUserFoundText: "No Records Found",
      userNotFoundIndex: 1,
    };

    await systemUserPage.$.searchUserComponent.searchUserByUserName(
      user.userName
    );

    await systemUserPage.performRemovalOfUser(
      testData.createdUserCheckboxIndex
    );
    await systemUserPage.$.searchUserComponent.searchUserByUserName(
      user.userName
    );

    await expect(
      systemUserPage.$.userTable.$.userRows.nth(testData.userNotFoundIndex)
    ).toHaveText(testData.noUserFoundText);
  });
});
