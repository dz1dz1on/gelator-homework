import { Page } from "@playwright/test";
import { PageObject } from "../../base-page-objects/page-object";
import { MainMenuBarComponent } from "../shared-components/main-menu-bar.component";
import { AttachmentsComponent } from "./attachments.component";
import { PersonalDetailsComponent } from "./personal-details.component";

const pageUrl = "/index.php/pim/viewMyDetails";

export class MyInfoPage extends PageObject {
  $ = {
    circleChart: this.page.locator("#panel_draggable_1_0"),
    mainMenuBar: new MainMenuBarComponent(this.page),
    personalDetails: new PersonalDetailsComponent(this.page),
    attachmets: new AttachmentsComponent(this.page),
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.personalDetails.$.saveOrEdditButton.hover();
  }
}
