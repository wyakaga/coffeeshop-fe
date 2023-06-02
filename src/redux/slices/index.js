import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import cartSlice from "./cart";

const reducer = combineReducers({
	auth: authSlice,
	cart: cartSlice,
});

export default reducer;
