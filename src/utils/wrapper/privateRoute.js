/* eslint-disable react/prop-types */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { authAction } from "../../redux/slices/auth";
import { cartAction } from "../../redux/slices/cart";
import { historyAction } from "../../redux/slices/history";
import { userAction } from "../../redux/slices/user";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth?.data?.token);

  React.useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, []);

  return <>{children}</>;
}

export function IsLogin({ children }) {
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.data.token);

  React.useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, []);

  return <>{children}</>;
}

export function AdminRoute({ children }) {
  const navigate = useNavigate();

  const adminRole = useSelector((state) => state.auth.data?.data?.role_id);

  React.useEffect(() => {
    if (adminRole !== 1) navigate("/", { replace: true });
  }, []);

  return <>{children}</>;
}

export function TokenHandler({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth?.data?.token);

  React.useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        dispatch(authAction.delete());
        dispatch(cartAction.resetCart());
        dispatch(historyAction.reset());
        dispatch(userAction.reset());
        navigate("/login", { replace: true });
      }
    }
  }, [token]);

  return <>{children}</>;
}
