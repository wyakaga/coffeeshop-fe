import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer , FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "./slices";

const persistConfig = {
	key: "coffee_shop",
	storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
	middleware: (defaultMiddleware) => {
		return defaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE],
			}
		});
	},
});

export const persistor = persistStore(store)
export default store;
