import { axiosInstance } from "./axios.instance";

export const apiConnector = (
  method,
  url,
  bodyData = null,
  headers = {},
  params = {}
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: { ...headers },
    params,
  });
};