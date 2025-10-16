import { type RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { type JSX, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { setUser } from "@/store/authSlice";
import useAuthRedirect from "@/hooks/useAuthRedirect.tsx";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const isAuth = useAuthRedirect();
  const { data: user, isLoading, isError } = useCurrentUser(Boolean(isAuthenticated));
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth === null || isLoading) return; // wait until auth resolved
    if (isError) {
      console.error("Error fetching current user");
    }
    if (isAuthenticated && !user) {
      console.error("User is authenticated but user data is null");
    }
    if (!isAuthenticated) {
      void navigate("/");
    }
    if (isAuthenticated && user && !currentUser) {
      dispatch(setUser(user));
    }
  }, [user, isLoading, isError, dispatch, isAuthenticated, currentUser, navigate, isAuth]);
  // While we are resolving auth, render nothing to avoid a flash/blank
  if (isAuth === null) return null;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};
