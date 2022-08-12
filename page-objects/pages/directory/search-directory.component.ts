import { Locator, Page } from "@playwright/test";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

export class SearchDirectoryComponent extends PageObjectComponent {
  $ = {
    searchButton: this.page.locator("#searchBtn"),
    resetButton: this.page.locator("#resetBtn"),
    searchNameInput: this.page.locator("#searchDirectory_emp_name_empName"),
    searchJobTitleInput: this.page.locator("#searchDirectory_job_title"),
    searchLocationInput: this.page.locator("#searchDirectory_location"),
  };
  constructor(page: Page) {
    super(page, page.locator("#search_form"));
  }

  async searchJobTitle(nameOrIndex: string | number): Promise<void> {
    typeof nameOrIndex === "string"
      ? await this.$.searchJobTitleInput.selectOption({ label: nameOrIndex })
      : await this.$.searchJobTitleInput.selectOption({ index: nameOrIndex });
    await this.$.searchButton.click();
  }

  async searchLocation(index: number): Promise<void> {
    await this.$.searchLocationInput.selectOption({ index });
    await this.$.searchButton.click();
  }

  async getSelectedValueOfLocation(): Promise<string> {
    return await this.getSelectedValueFor(this.$.searchLocationInput);
  }

  async getSelectedValueOfJobTitle(): Promise<string> {
    return await this.getSelectedValueFor(this.$.searchJobTitleInput);
  }

  private async getSelectedValueFor(parenLocator: Locator): Promise<string> {
    const selectedOptionText = await parenLocator
      .locator('option[selected="selected"]')
      .innerText();
    return selectedOptionText.trim();
  }
}
