import { Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";
import { AttachmentsTableComponent } from "./table-attachments.component";

export class AttachmentsComponent extends PageObjectComponent {
  $ = {
    addButton: this.parentElement.locator("#btnAddAttachment"),
    uploadFileInput: this.page.locator("#ufile"),
    commentInput: this.page.locator("#txtAttDesc"),
    uploadButton: this.page.locator("#btnSaveAttachment"),
    attachmentTable: new AttachmentsTableComponent(this.page),
  };

  constructor(page: Page) {
    super(page, page.locator("#attachmentList"));
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.$.addButton.click();
    await this.$.uploadFileInput.setInputFiles(filePath);
    await this.$.commentInput.fill("test comment");
    await this.$.uploadButton.click();
  }
}
