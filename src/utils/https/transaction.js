import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const createTransaction = (body, token, controller) => {
  const url = `${baseUrl}/history`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.post(url, body, config);
};

export const getHistory = (token, controller) => {
  const url = `${baseUrl}/history`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.get(url, config);
};

export const deleteHistory = (historyId, productId, token, controller) => {
  const url = `${baseUrl}/history/${historyId}?productId=${productId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.delete(url, config);
};
