import authReducer from "@/store/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authListenerMiddleware } from "@/store/middleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
