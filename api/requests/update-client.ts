import { ApiClient } from "../api-client";

interface PutClientParams {
  archived: boolean;
  name: string;
  note: string;
}

export const updateClient = async (
  workspaceId: string,
  clientId: string,
  params: PutClientParams
) => {
  return await ApiClient.callApi<PutClientParams>({
    method: "put",
    url: `/workspaces/${workspaceId}/clients/${clientId}`,
    params,
  });
};
