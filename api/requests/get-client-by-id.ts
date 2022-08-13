import { ApiClient } from "../api-client";

export const getClientById = async (workspaceId: string, clientId: string) => {
  return await ApiClient.callApi<void>({
    method: "get",
    url: `/workspaces/${workspaceId}/clients/${clientId}`,
  });
};
