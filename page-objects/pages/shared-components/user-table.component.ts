import { Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

export class UserTableComponent extends PageObjectComponent {
  $ = {
    addUserButton: this.page.locator("#btnAdd"),
    deleteUserButton: this.page.locator("#btnDelete"),
    userName: (index: number) =>
      this.parentElement.locator("tr").nth(index).locator("td").nth(2),
  };

  constructor(page: Page) {
    super(page, page.locator("#resultTable"));
  }

  async getUserName(userIndex: number): Promise<string> {
    return await this.$.userName(userIndex).innerText();
  }
}
