import axios from "axios";
import { ApiRoot } from "../config/apiRoot";
const token = localStorage.getItem("token");
export const fetchServerRequest = (uri: string) => {
	return axios.get(`${ApiRoot}/${uri}`, {
		headers: {
			Authorization: token,
		},
	});
};

export const updateServerRequest = (uri: string, data: any) => {
	return axios.patch(
		`${ApiRoot}/${uri}`,
		{
			data,
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);
};
