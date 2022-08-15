import axios, { AxiosError, AxiosResponse, Method } from "axios";
import chalk from "chalk";

type PerformAppApiCallParams<T> =
  | {
      method: "get" | "delete";
      url: string;
      params?: T;
    }
  | {
      method: "post" | "put";
      url: string;
      params: T;
    };

const onResponse = <T>(response: AxiosResponse<T>) => {
  console.log(`   response: ${JSON.stringify(response.data)}`);
  console.log(`   status: ${response.status}`);
  return response;
};

const onError = (error: AxiosError) => {
  console.error(`${chalk.red.bold("🚨ERROR!🚨")}`);
  console.error(`   message: ${chalk.yellow.bold(error.message)}`);
  console.error(`   status: ${chalk.yellow(error.response?.status)}`);
  console.error(`   data: ${chalk.red(JSON.stringify(error.response?.data))}`);
  console.error(`   stack: ${chalk.red(error.stack)}`);

  return {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    stack: error.stack,
  };
};

export const callApi = async <T>({
  method,
  url,
  params,
}: PerformAppApiCallParams<T>): Promise<any> => {
  const baseUrl = "https://api.clockify.me/api/v1";
  const constructedUrl = `${baseUrl}${url}`;

  let paramsSent = JSON.stringify(params);

  console.log(`Performing app api call`);
  console.log(`   url: ${constructedUrl}`);
  console.log(`   params: ${paramsSent}`);

  let apiCall;
  const lowercaseMethod: Method = method.toLocaleLowerCase() as Method;
  //TODO: API key should be stored in env,
  const apiCallConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "MTBhOTgwNmItOWIxOC00NTEwLWIyYzMtMDhlYzQ2NjZkNjA4",
    },
  };

  if (lowercaseMethod === "get") {
    apiCall = axios.get(constructedUrl, apiCallConfig);
  }
  if (lowercaseMethod === "put") {
    apiCall = axios.put(constructedUrl, params, apiCallConfig);
  }
  if (lowercaseMethod === "post") {
    apiCall = axios.post(constructedUrl, params, apiCallConfig);
  }
  if (lowercaseMethod === "delete") {
    apiCall = axios.delete(constructedUrl, apiCallConfig);
  }

  return apiCall.then(onResponse).catch((error: AxiosError) => onError(error));
};
