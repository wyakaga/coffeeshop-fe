import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const login = (email, password) => {
  const url = `${baseUrl}/auth`
  const body = { email, password }
  return axios.post(url, body);
}

export const signup = (email, password, phone_number) => {
  const url = `${baseUrl}/users`;
  const body = { email, password, phone_number };
  return axios.post(url, body);
}

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

export const updateProfile = (id, token, address, display_name, first_name, last_name, birth_date, gender, img) => {
  const body = new FormData()

  body.append("address", address)
  body.append("display_name", display_name)
  body.append("first_name", first_name)
  body.append("last_name", last_name)
  body.append("birth_date", birth_date)
  body.append("gender", gender)
  body.append("img", img)

  const url = `${baseUrl}/users/${id}`

  return axios.patch(url, body, {
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
     }
  })
};

export const editPwd = (oldPwd, newPwd, token) => {
  const body = { oldPwd, newPwd };
  const url = `${baseUrl}/auth`
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logout = (token, controller) => {
  const url = `${baseUrl}/auth/logout`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, {}, config);
}