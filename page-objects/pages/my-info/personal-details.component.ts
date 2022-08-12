import { Page } from "@playwright/test";
import { User } from "../../../data/user.data";
import { PageObjectComponent } from "../../base-page-objects/page-object.component";

// I didn't fill all inputs they are just simple inputs and they didn't show anywhere.
// In working scenario of course all inputs should be represented in PageObjectComponent
// Just showing a pattern
export class PersonalDetailsComponent extends PageObjectComponent {
  $ = {
    firstNameInput: this.parentElement.locator("#personal_txtEmpFirstName"),
    middleNameInput: this.parentElement.locator("#personal_txtEmpMiddleName"),
    lastNameInput: this.parentElement.locator("#personal_txtEmpLastName"),
    employeeIdInput: this.parentElement.locator("#personal_txtEmployeeId"),
    driverLicenseNoInput: this.parentElement.locator("#personal_txtLicenNo"),
    licenceExpiryDateInput: this.parentElement.locator(
      "#personal_txtLicExpDate"
    ),
    selectMartialStatus: this.parentElement.locator("#personal_cmbMarital"),
    nickNameInput: this.parentElement.locator("#personal_txtEmpNickName"),
    personalDayOfBirthInput: this.parentElement.locator("#personal_DOB"),
    saveOrEdditButton: this.page.locator("#btnSave"),
    profileName: this.page.locator("#profile-pic"),
  };

  constructor(page: Page) {
    super(page, page.locator("#pdMainContainer"));
  }

  async getProfileName(): Promise<string> {
    return this.$.profileName.innerText();
  }

  async setDateOfBirth(date: string): Promise<void> {
    await this.$.personalDayOfBirthInput.fill(date);
  }

  async updateBasicPersonalDetails(user: User): Promise<void> {
    await this.$.saveOrEdditButton.click();
    await this.$.firstNameInput.fill(user.firstName);
    await this.$.lastNameInput.fill(user.lastName);
    await this.$.middleNameInput.fill(user.middleName);
  }
}
