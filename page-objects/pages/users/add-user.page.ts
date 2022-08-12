import { Page } from "@playwright/test";
import { StatusState, User, UserRole } from "../../../data/user.data";
import { PageObject } from "../../base-page-objects/page-object";
import { MainMenuBarComponent } from "../shared-components/main-menu-bar.component";

const pageUrl = "/index.php/admin/saveSystemUsers";

export class SaveSystemUser extends PageObject {
  $ = {
    mainMenuBar: new MainMenuBarComponent(this.page),
    userRoleSelect: this.page.locator("#systemUser_userType"),
    employeeNameInput: this.page.locator("#systemUser_employeeName_empName"),
    userNameInput: this.page.locator("#systemUser_userName"),
    statusSelect: this.page.locator("#systemUser_status"),
    passwordInput: this.page.locator("#systemUser_password"),
    confirmPasswordInput: this.page.locator("#systemUser_confirmPassword"),
    saveButton: this.page.locator("#btnSave"),
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.userRoleSelect.hover();
  }

  async selectRole(userRole: UserRole): Promise<void> {
    await this.$.userRoleSelect.selectOption({ label: userRole });
  }

  async selectStatus(status: StatusState): Promise<void> {
    await this.$.statusSelect.selectOption({ label: status });
  }

  async fillEmployeeName(firstLetterOfEmployeeName: string): Promise<void> {
    await this.$.employeeNameInput.type(firstLetterOfEmployeeName);
    await this.page.keyboard.press("Enter");
  }

  async addUser(user: User, firstLetterOfEmployeeName: string): Promise<void> {
    await this.selectRole(user.userRole);
    await this.fillEmployeeName(firstLetterOfEmployeeName);
    await this.$.userNameInput.fill(user.userName);
    await this.selectStatus(user.status);
    await this.$.passwordInput.fill(user.password);
    await this.$.confirmPasswordInput.fill(user.password);
    await this.$.saveButton.click();
  }
}
