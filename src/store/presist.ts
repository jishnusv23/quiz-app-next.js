import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist";
import { userReducer } from "./slice/user";

const presistConfig: PersistConfig<any> = {
  key: "root",
  storage,
};

const presistUserReducer = persistReducer(presistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: presistUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch