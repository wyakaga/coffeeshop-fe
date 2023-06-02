import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const getUser = (id, token, controller) => {
	const url = `${baseUrl}/users/${id}`;
	const config = { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal };
	return axios.get(url, config);
};
