import { ApiClient } from "../api-client";

interface AddClientParams {
  name: string;
  note: string;
}

export const addNewClient = async (
  workspaceId: string,
  params: AddClientParams
) => {
  return await ApiClient.callApi<AddClientParams>({
    method: "post",
    url: `/workspaces/${workspaceId}/clients`,
    params,
  });
};
