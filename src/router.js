import React from "react";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute, {
  AdminRoute,
  IsLogin,
  TokenHandler,
} from "./utils/wrapper/privateRoute";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TokenHandler>
        <Home />
      </TokenHandler>
    ),
    errorElement: (
      <TokenHandler>
        <Error />
      </TokenHandler>
    ),
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
      <TokenHandler>
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </TokenHandler>
    ),
  },
  {
    path: "/history",
    element: (
      <TokenHandler>
        <PrivateRoute>
          <History />
        </PrivateRoute>
      </TokenHandler>
    ),
  },
  {
    path: "/payment",
    element: (
      <TokenHandler>
        <PrivateRoute>
          <Payment />
        </PrivateRoute>
      </TokenHandler>
    ),
  },
  {
    path: "/products",
    element: (
      <TokenHandler>
        <Product />
      </TokenHandler>
    ),
  },
  {
    path: "/products/detail/:id",
    element: (
      <TokenHandler>
        <ProductDetail />
      </TokenHandler>
    ),
  },
  {
    path: "/products/create",
    element: (
      <TokenHandler>
        <PrivateRoute>
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        </PrivateRoute>
      </TokenHandler>
    ),
  },
  {
    path: "/orders",
    element: (
      <TokenHandler>
        <PrivateRoute>
          <AdminRoute>
            <Orders />
          </AdminRoute>
        </PrivateRoute>
      </TokenHandler>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <TokenHandler>
        <PrivateRoute>
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        </PrivateRoute>
      </TokenHandler>
    ),
  },
]);

export default router;
