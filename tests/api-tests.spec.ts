import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { ApiClient } from "../api/api-client";
/*
  These tests are just showing the pattern. 
  They can be much more complex and set up things like a user by using only API. 
*/
test.describe.only("API tests", () => {
  let workspaceId;
  let userName;
  let clientId;

  test.beforeEach(async () => {
    userName = `${faker.name.firstName()} ${faker.name.lastName()}`;
    workspaceId = (await ApiClient.getUserInfo()).data.activeWorkspace;
    clientId = (
      await ApiClient.addNewClient(workspaceId, {
        name: userName,
        note: "random note",
      })
    ).data.id;
  });

  test.afterEach(async () => {
    // Cleanning function
    await ApiClient.deleteClient(workspaceId, clientId);
  });

  test("POST should add new client", async () => {
    await expect(
      (
        await ApiClient.getClientById(workspaceId, clientId)
      ).data.name
    ).toEqual(userName);
  });

  test("POST should not add second client with the same name", async () => {
    const badRequest = await ApiClient.addNewClient(workspaceId, {
      name: userName,
      note: "random note",
    });

    await expect(badRequest.status).toEqual(400);
  });

  test("PUT should update new client", async () => {
    const testData = { changedName: "TestPut", changedNote: "test note" };
    await expect(
      (
        await ApiClient.getClientById(workspaceId, clientId)
      ).data.name
    ).toEqual(userName);

    await ApiClient.updateClient(workspaceId, clientId, {
      name: testData.changedName,
      note: testData.changedNote,
      archived: false,
    });

    const { name, note } = (
      await ApiClient.getClientById(workspaceId, clientId)
    ).data;

    await expect(name).toEqual(testData.changedName);
    await expect(note).toEqual(testData.changedNote);
    await expect(name).not.toEqual(userName);
  });

  test("PUT should return 400 after updating removed user", async () => {
    const testData = {
      changedName: "TestPut",
      changedNote: "test note",
    };

    await expect(
      (
        await ApiClient.deleteClient(workspaceId, clientId)
      ).status
    ).toEqual(200);

    const getClient = await ApiClient.getClientById(workspaceId, clientId);
    const updateClient = await ApiClient.updateClient(workspaceId, clientId, {
      name: testData.changedName,
      note: testData.changedNote,
      archived: false,
    });

    await expect(updateClient.status).toEqual(400);
    await expect(getClient.status).toEqual(400);
  });
});
