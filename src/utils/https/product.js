import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const getProduct = (
  category,
  order,
  search,
  limit,
  page,
  controller
) => {
  let url = `${baseUrl}/products`;

  if (category) {
    url += `?category=${category}`;
  }
  if (order) {
    url += `${category ? "&" : "?"}order=${order}`;
  }
  if (search) {
    url += `${category || order ? "&" : "?"}search=${search}`;
  }
  if (limit) {
    url += `${category || order || search ? "&" : "?"}limit=${limit}`;
  }
  if (page) {
    url += `${category || order || search || limit ? "&" : "?"}page=${page}`;
  }

  const config = { signal: controller.signal };

  return axios.get(url, config);
};

export const getProductDetails = (id, controller) => {
  const url = `${baseUrl}/products/${id}`;
  const config = { signal: controller.signal };
  return axios.get(url, config);
};

export const createProduct = (
  img,
  name,
  price,
  description,
  category,
  token,
  controller
) => {
  const body = new FormData();

  body.append("img", img);
  body.append("name", name);
  body.append("price", price);
  body.append("description", description);
  body.append("category_id", category);

  const url = `${baseUrl}/products`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  };

  return axios.post(url, body, config);
};

export const editProduct = (
  img,
  name,
  price,
  description,
  id,
  token,
  controller
) => {
  const body = new FormData();

  body.append("img", img);
  body.append("name", name);
  body.append("price", price);
  body.append("description", description);

  const url = `${baseUrl}/products/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  };

  return axios.patch(url, body, config);
};

export const deleteProduct = (id, token, controller) => {
  const url = `${baseUrl}/products/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  };

  return axios.delete(url, config);
};
