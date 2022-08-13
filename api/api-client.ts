import { callApi } from "./api-helper";
import { addNewClient } from "./requests/add-new-client";
import { deleteClient } from "./requests/delete-client";
import { getClientById } from "./requests/get-client-by-id";
import { getUserInfo } from "./requests/get-user";
import { updateClient } from "./requests/update-client";

export class ApiClient {
  static callApi = callApi;
  static getUserInfo = getUserInfo;
  static addNewClient = addNewClient;
  static updateClient = updateClient;
  static deleteClient = deleteClient;
  static getClientById = getClientById;
}
