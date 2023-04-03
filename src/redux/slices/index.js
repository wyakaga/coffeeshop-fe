import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";

const reducer = combineReducers({
  auth: authSlice
})

export default reducer