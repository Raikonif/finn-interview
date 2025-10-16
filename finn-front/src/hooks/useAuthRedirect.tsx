import { useEffect, useState } from "react";
import { isLoggedIn as isLoggedInJWT, getJWTLocalStorageSecure } from "@/services/users";
import { useDispatch } from "react-redux";
import { isLoggedIn, rehydrateTokens } from "@/store/authSlice";

export default function useAuthRedirect(): boolean | null {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedInJWT()) {
      const tokens = getJWTLocalStorageSecure();
      dispatch(rehydrateTokens(tokens));
      dispatch(isLoggedIn(true));
      setIsAuth(true);
    } else {
      dispatch(isLoggedIn(false));
      setIsAuth(false);
    }
  }, [dispatch]);
  return isAuth;
}
