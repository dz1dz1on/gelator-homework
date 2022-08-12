import { Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

export class UserTableComponent extends PageObjectComponent {
  $ = {
    addUserButton: this.page.locator("#btnAdd"),
    deleteUserButton: this.page.locator("#btnDelete"),
    rowCheckbox: (checkboxIndex: number) =>
      this.parentElement.locator('[type="checkbox"]').nth(checkboxIndex),
    userRows: this.parentElement.locator("tr"),
    userName: (index: number) =>
      this.parentElement
        .locator("tr")
        .nth(index + 1)
        .locator("td")
        .nth(1),
  };

  constructor(page: Page) {
    super(page, page.locator("#resultTable"));
  }

  async getUserName(userIndex: number): Promise<string> {
    return await this.$.userName(userIndex).innerText();
  }
}