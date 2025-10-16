import { type FormEvent, useRef, useTransition } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "@/store/authSlice";
import { toast } from "sonner";
import { DASHBOARD } from "@/constants/authentication";
import { signInUser } from "@/services/users";
import { type AuthCredentials } from "@/interfaces/authentication";

export default function useSignIn() {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    startTransition(async () => {
      try {
        const email = emailRef.current?.value || "";
        const pass = passRef.current?.value || "";

        const payload: AuthCredentials = {
          email: email,
          password: pass,
        };

        const tokens = await signInUser(payload);

        dispatch(loginSuccess(tokens));
        toast.success("Inicio de sesión exitoso.");
        void navigate(DASHBOARD);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido al iniciar sesión";
        dispatch(loginFailure(errorMessage));
        console.error("Login failed:", error);
        toast.error("Error al iniciar sesión. Revisa tus credenciales.");
      }
    });
  };

  return { emailRef: emailRef, passRef: passRef, isLoading: isPending, handleSubmit: handleSubmit };
}
