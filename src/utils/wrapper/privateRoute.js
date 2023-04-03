/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
	const navigate = useNavigate();

	const token = useSelector((state) => state.auth.data.token);

	React.useEffect(() => {
		if (!token) navigate("/login");
	}, []);

	return <>{children}</>;
}

export function IsLogin({ children }) {
	const navigate = useNavigate();

	const token = useSelector((state) => state.auth.data.token);

	React.useEffect(() => {
		if (token) navigate("/");
	}, []);

	return <>{children}</>;
}
