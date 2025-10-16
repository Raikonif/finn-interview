import { createListenerMiddleware } from "@reduxjs/toolkit";
import { loginSuccess, logout, refreshAccess } from "@/store/authSlice";
import { removeJWTLocalStorage, setJWTLocalStorage } from "@/services/users";
import type {TokenResponse} from "@/interfaces/authentication";
import { storage } from "@/utils/storage";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: loginSuccess,
  effect: (action: ReturnType<typeof loginSuccess>) => {
    if (typeof window !== "undefined") {
      setJWTLocalStorage(action.payload as TokenResponse);
    }
  },
});

authListenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    if (typeof window !== "undefined") {
      removeJWTLocalStorage();
    }
  },
});

authListenerMiddleware.startListening({
  actionCreator: refreshAccess,
  effect: (action: ReturnType<typeof refreshAccess>) => {
    if (typeof window !== "undefined") {
      storage.setItem("access", action.payload as string);
    }
  },
});
