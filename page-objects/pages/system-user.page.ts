import { Page } from "@playwright/test";
import { PageObject } from "../base-page-objects/page-object";
import { MainMenuBarComponent } from "./shared-components/main-menu-bar.component";
import { UserTableComponent } from "./shared-components/user-table.component";

const pageUrl = "/index.php/admin/viewSystemUsers";

export class LoginPage extends PageObject {
  $ = {
    searchButton: this.page.locator("#searchBtn"),
    mainMenuBar: new MainMenuBarComponent(this.page),
    userTable: new UserTableComponent(this.page),
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.searchButton.hover();
  }
}
