import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import cartSlice from "./cart";
import historySlice from "./history";
import userSlice from "./user";

const reducer = combineReducers({
	auth: authSlice,
	cart: cartSlice,
	history: historySlice,
	user: userSlice,
});

export default reducer;
