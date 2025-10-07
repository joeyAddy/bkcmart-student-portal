// Redux store exports
export { store, persistor } from "./store";
export type { RootState, AppDispatch } from "./store";

// Redux hooks
export { useAppDispatch, useAppSelector } from "./store/hooks";

// Redux Provider
export { ReduxProvider } from "./redux-provider";

// Action creators from slices
export {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
} from "./store/slices/authSlice";

export {
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setGlobalLoading,
} from "./store/slices/uiSlice";

// Export RTK Query API hooks and types
export * from "./store/api";
