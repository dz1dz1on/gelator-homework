import { Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

export class DeleteModal extends PageObjectComponent {
  $ = {
    okButton: this.parentElement.locator("#dialogDeleteBtn"),
  };
  constructor(page: Page) {
    super(page, page.locator("#deleteConfModal"));
  }
}
