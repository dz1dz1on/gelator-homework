import { Page } from "@playwright/test";
import { User } from "../../../data/user.data";
import { PageObject } from "../../base-page-objects/page-object";
import { MainMenuBarComponent } from "../shared-components/main-menu-bar.component";
import { UserTableComponent } from "../shared-components/user-table.component";
import { SaveSystemUser } from "./add-user.page";
import { DeleteModal } from "./delete-modal.component";
import { SearchUserComponent } from "./search-user.component";

const pageUrl = "/index.php/admin/viewSystemUsers";

export class SystemUserPage extends PageObject {
  $ = {
    searchUserComponent: new SearchUserComponent(this.page),
    mainMenuBar: new MainMenuBarComponent(this.page),
    userTable: new UserTableComponent(this.page),
    saveSystemUser: new SaveSystemUser(this.page),
    deleteModal: new DeleteModal(this.page),
  };

  constructor(page: Page) {
    super(page, pageUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.searchUserComponent.$.searchButton.hover();
  }

  async performRemovalOfUser(checkboxIndex: number): Promise<void> {
    await this.$.userTable.$.rowCheckbox(checkboxIndex).click();
    await this.$.userTable.$.deleteUserButton.click();
    await this.$.deleteModal.$.okButton.click();
  }

  async performAddingOfUser(
    user: User,
    firstLetterOfEmployeeName: string
  ): Promise<void> {
    await this.$.userTable.$.addUserButton.click();
    await this.$.saveSystemUser.addUser(user, firstLetterOfEmployeeName);
  }
}
