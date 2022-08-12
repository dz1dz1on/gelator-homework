import { Page } from "@playwright/test";
import { PageObject } from "../../base-page-objects/page-object";
import { UserTableComponent } from "../shared-components/user-table.component";

type JobNameType = "QA Engineer" | "IT Manager" | "Software Engineer";

const pageUrl = "/index.php/recruitment/viewJobVacancy";

export class RecruitmentPage extends PageObject {
  $ = {
    addVacancyButton: this.page.locator("#btnAdd"),
    vacancyTable: new UserTableComponent(this.page), // TODO: this is using the same PO so we need to change user table naming for more generic one
    jobtTitleSelect: this.page.locator("#addJobVacancy_jobTitle"),
    vacancyNameInput: this.page.locator("#addJobVacancy_name"),
    hiringManagerInput: this.page.locator("#addJobVacancy_hiringManager"),
    noOfPoistionsInput: this.page.locator("#addJobVacancy_noOfPositions"),
    saveButton: this.page.locator("#btnSave"),
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.addVacancyButton.hover();
  }
  //TODO: use Object instead of next args
  async addVacancy(
    jobName: JobNameType,
    vacancyName: string,
    noOfPoistionsInputs: number
  ): Promise<void> {
    await this.$.addVacancyButton.click();
    await this.$.jobtTitleSelect.selectOption({ label: jobName });
    await this.$.vacancyNameInput.fill(vacancyName);
    await this.$.hiringManagerInput.type("A"); //TODO: do it with parameters
    await this.page.keyboard.press("Enter");
    await this.$.noOfPoistionsInput.fill(`${noOfPoistionsInputs}`);
    await this.$.saveButton.click();
  }
}
