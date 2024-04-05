import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./RootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export default store;
