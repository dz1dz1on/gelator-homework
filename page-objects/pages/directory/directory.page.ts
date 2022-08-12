import { Page } from "@playwright/test";
import { PageObject } from "../../base-page-objects/page-object";
import { MainMenuBarComponent } from "../shared-components/main-menu-bar.component";
import { UserTableComponent } from "../shared-components/user-table.component";
import { SearchDirectoryComponent } from "./search-directory.component";

const pageUrl = "/index.php/directory/viewDirectory";

export class DirectoryPage extends PageObject {
  $ = {
    mainMenuBar: new MainMenuBarComponent(this.page),
    userTable: new UserTableComponent(this.page),
    searchDirectory: new SearchDirectoryComponent(this.page),
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.searchDirectory.$.searchButton.hover();
  }
}
