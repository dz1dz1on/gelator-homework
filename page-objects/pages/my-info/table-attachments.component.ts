import { Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

// I think we shou create reusable table component where we pass parentElement and this component should be stored in shared-components.
export class AttachmentsTableComponent extends PageObjectComponent {
  $ = {
    fileName: (fileName: string) =>
      this.parentElement.locator(`tr  >> td:has-text("${fileName}")`).nth(0),
  };

  constructor(page: Page) {
    super(page, page.locator("#tblAttachments"));
  }
}
