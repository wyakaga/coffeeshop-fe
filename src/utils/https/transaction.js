import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const createTransaction = (body, token, controller) => {
	const url = `${baseUrl}/history`;
	const config = { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal };
	return axios.post(url, body, config);
};
