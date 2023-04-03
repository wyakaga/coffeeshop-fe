import React from "react";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute, { IsLogin } from "./utils/wrapper/privateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Payment from "./pages/Payment";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: (
			<IsLogin>
				<Login />
			</IsLogin>
		),
	},
	{
		path: "/signup",
		element: (
			<IsLogin>
				<SignUp />
			</IsLogin>
		),
	},
	{
		path: "/forgot",
		element: (
			<IsLogin>
				<Forgot />
			</IsLogin>
		),
	},
	{
		path: "/profile",
		element: (
			<PrivateRoute>
				<Profile />
			</PrivateRoute>
		),
	},
	{
		path: "/history",
		element: (
			<PrivateRoute>
				<History />
			</PrivateRoute>
		),
	},
	{
		path: "/payment",
		element: (
			<PrivateRoute>
				<Payment />
			</PrivateRoute>
		),
	},
	{
		path: "/products",
		element: <Product />,
	},
	{
		path: "/products/detail/:id",
		element: <ProductDetail />,
	},
]);

export default router;
