import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const getUser = (id, token, controller) => {
  const url = `${baseUrl}/users/${id}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.get(url, config);
};

export const updateProfile = (
  id,
  token,
  controller,
  address,
  display_name,
  first_name,
  last_name,
  birth_date,
  gender,
  img
) => {
  const body = new FormData();

  body.append("address", address);
  body.append("display_name", display_name);
  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("birth_date", birth_date);
  body.append("gender", gender);
  body.append("img", img);

  const url = `${baseUrl}/users/${id}`;

  return axios.patch(url, body, {
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      signal: controller.signal,
    },
  });
};

export const removeImage = (id, token, controller) => {
  const url = `${baseUrl}/users/${id}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.delete(url, config);
};
