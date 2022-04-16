import { Form } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api";

type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {}
) => {
  let url;
  let payload: string;

  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Basic Auth Credentials
  const auth = "Basic " + window.btoa("naman114:Efm%ivAaK%ounWsW5VW%ZkN3EX");
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: payload,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const createForm = (form: Form) => {
  return request("/forms/", "POST", form);
};
