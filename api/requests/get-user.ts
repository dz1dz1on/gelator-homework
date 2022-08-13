import { ApiClient } from "../api-client";
//TODO: we shouldn't pass any. Pass type of returned object instead
export const getUserInfo = async () => {
  return await ApiClient.callApi<void>({
    method: "get",
    url: "/user",
  });
};
