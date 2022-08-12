import { Page } from "@playwright/test";
import { PageObject } from "../base-page-objects/page-object";

const pageUrl = "";

export class LoginPage extends PageObject {
  $ = {
    userNameInput: this.page.locator("#txtUsername"),
    passwordInput: this.page.locator("#txtPassword"),
    submitButton: this.page.locator("#btnLogin"),
    forgotPasswordLink: this.page.locator("#forgotPasswordLink"),
    errorMessage: this.page.locator("#spanMessage"),
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.submitButton.hover();
  }

  //TODO: add logging via api instead of using this function
  async loginToAccount(name: string, password: string): Promise<void> {
    await this.$.userNameInput.fill(name);
    await this.$.passwordInput.fill(password);
    await this.$.submitButton.click();
  }
}
