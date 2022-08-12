import { Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

export class SearchUserComponent extends PageObjectComponent {
  $ = {
    searchButton: this.page.locator("#searchBtn"),
    searchInput: this.page.locator("#searchSystemUser_userName"),
  };
  constructor(page: Page) {
    super(page, page.locator("#resultTable"));
  }

  async searchUserByUserName(userName: string): Promise<void> {
    await this.$.searchInput.fill(userName);
    await this.$.searchButton.click();
    await this.page.waitForLoadState();
  }
}
