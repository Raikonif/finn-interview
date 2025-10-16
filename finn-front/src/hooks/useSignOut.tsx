import { type SyntheticEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { LOGIN } from "@/constants/authentication";

export default function useSignOut() {
  const logOutRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    dispatch(logout(null));
    toast.info("Cerraste sesión.");
    void navigate(LOGIN);
  };
  return {
    logOutRef: logOutRef,
    handleSubmit: handleSubmit,
  };
}
