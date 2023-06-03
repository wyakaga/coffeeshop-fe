import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import cartSlice from "./cart";
import historySlice from "./history";

const reducer = combineReducers({
	auth: authSlice,
	cart: cartSlice,
	history: historySlice,
});

export default reducer;
