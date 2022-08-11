import { faker } from "@faker-js/faker";

type USERS = (string | number)[][];

export const USERS: USERS = [];

export function createRandomUser(): (string | number)[] {
  return [
    faker.internet.email(),
    faker.name.firstName(),
    faker.name.lastName(),
    faker.address.city(),
    faker.address.country(),
    Math.floor(Math.random() * 1000000000),
  ];
}

function createRandomUsers(numberOfUsers: number) {
  return Array.from({ length: numberOfUsers }).forEach(() => {
    return USERS.push(createRandomUser());
  });
}

createRandomUsers(3);

console.log(USERS);
