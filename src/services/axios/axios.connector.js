import { axiosInstance } from "./axios.instance";

// export const apiConnector = (
//   method,
//   url,
//   bodyData = null,
//   headers = {},
//   params = {}
// ) => {
//   return axiosInstance({
//     method,
//     url,
//     data: bodyData,
//     headers: { ...headers },
//     params,
//   });
// };

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null, // This allows the "multipart/form-data" to pass through
    params: params ? params : null,
  });
};
