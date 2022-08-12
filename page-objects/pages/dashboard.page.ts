import { Page } from "@playwright/test";
import { PageObject } from "../base-page-objects/page-object";
import { MainMenuBarComponent } from "./shared-components/main-menu-bar.component";

const pageUrl = "/index.php/dashboard";

export class DashboardPage extends PageObject {
  $ = {
    circleChart: this.page.locator("#panel_draggable_1_0"),
    mainMenuBar: new MainMenuBarComponent(this.page),
    quickLaunchPanel: this.page.locator("#panel_draggable_0_0"), //TODO: move this to the component
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.circleChart.hover();
  }
}
