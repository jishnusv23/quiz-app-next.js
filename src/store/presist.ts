import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist";
import { userReducer } from "./slice/user";
import { quizReducer } from "./slice/quiz";

const presistConfig: PersistConfig<any> = {
  key: "root",
  storage,
};

const presistUserReducer = persistReducer(presistConfig, userReducer);
const presistQuizReducer=persistReducer(presistConfig,quizReducer)

export const store = configureStore({
  reducer: {
    user: presistUserReducer,
    quiz:presistQuizReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch