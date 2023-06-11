import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const login = (email, password) => {
  const url = `${baseUrl}/auth`;
  const body = { email, password };
  return axios.post(url, body);
};

export const signup = (email, password, phone_number) => {
  const url = `${baseUrl}/users`;
  const body = { email, password, phone_number };
  return axios.post(url, body);
};

export const getOtp = (email) => {
  const url = `${baseUrl}/auth/otp`;
  const body = { email };
  return axios.patch(url, body);
};

export const forgot = (email, otp, password) => {
  const url = `${baseUrl}/auth/forgot`;
  const body = { email, otp, password };
  return axios.patch(url, body);
};

export const editPwd = (oldPwd, newPwd, token, controller) => {
  const url = `${baseUrl}/auth`;
  const body = { oldPwd, newPwd };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, body, config);
};

export const logout = (token, controller) => {
  const url = `${baseUrl}/auth/logout`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, {}, config);
};
