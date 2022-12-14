import { faker } from "@faker-js/faker";

// normally we would like to store such data in .env file and use dotenv library
export const LOGIN_USER = { name: "Admin", password: "admin123" };

export type UserRole = "ESS" | "Admin";
export type StatusState = "Enabled" | "Disabled";
export interface UserParams {
  userRole?: UserRole;
  userName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  password?: string;
  status?: StatusState;
}

interface BaseUser {
  userRole: UserRole;
  userName: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  password: string;
  status: StatusState;
}

export class User implements BaseUser {
  userRole: UserRole = "ESS";
  userName: string = `${faker.internet.userName()}${Math.floor(
    Math.random() * 1000
  )}`;
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  status: StatusState = "Enabled";
  password: string = "useRpassword123!321";

  constructor(userParams: UserParams) {
    Object.assign(this, userParams);
  }

  static AdminUser(): User {
    return new User({
      userRole: "Admin",
    });
  }

  static DisabledUser(): User {
    return new User({ status: "Disabled" });
  }

  static personalDetailsUser(): User {
    return new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      middleName: faker.name.middleName(),
    });
  }

  static DefaultUser(): User {
    return new User({});
  }
}
