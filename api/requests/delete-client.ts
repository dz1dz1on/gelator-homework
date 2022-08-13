import { ApiClient } from "../api-client";

export const deleteClient = async (workspaceId: string, clientId: string) => {
  return await ApiClient.callApi<void>({
    method: "delete",
    url: `/workspaces/${workspaceId}/clients/${clientId}`,
  });
};
