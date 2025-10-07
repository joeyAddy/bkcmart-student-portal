import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Import your reducers here
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";

// Import RTK Query API
import { baseApi } from "./api";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // Optionally, you can blacklist certain reducers from being persisted
  blacklist: ["ui", "api"], // UI state and API cache don't need to be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  // Add RTK Query API reducer
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // Add RTK Query middleware
      .concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Setup RTK Query listeners for automatic refetching
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
