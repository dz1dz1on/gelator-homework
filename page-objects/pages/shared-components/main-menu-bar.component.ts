import { Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

export class MainMenuBarComponent extends PageObjectComponent {
  $ = {
    adminTab: this.parentElement.locator("#menu_admin_viewAdminModule"),
  };

  constructor(page: Page) {
    super(page, page.locator("#mainMenuFirstLevelUnorderedList"));
  }
}
