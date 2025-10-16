import { type FormEvent, useRef, useTransition } from "react";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

import {DASHBOARD} from "@/constants/authentication";
import { type UserAuthCredentials } from "@/interfaces/authentication";

import { toast } from "sonner";
import { signUpUser } from "@/services/users";

export default function useSignUp() {
  const [isPending, startTransition] = useTransition();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passConfirmRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    startTransition(async () => {
      if (passRef.current!.value !== passConfirmRef.current!.value) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }

      const email = emailRef.current!.value;
      const username = usernameRef.current!.value;
      const password = passRef.current!.value;

      const payload: UserAuthCredentials = {
        email: email,
        fullname: username,
        password: password,
      };

      const response = await signUpUser(payload);
      if (!response) {
        toast.error("Error al registrar. Inténtalo de nuevo.");
        return;
      }
      dispatch(setUser(response));
      toast.success("Registrado exitosamente. Verifica tu correo electrónico.");
      void navigate(DASHBOARD);
    });
  };
  return {
    emailRef: emailRef,
    passRef: passRef,
    passConfirmRef: passConfirmRef,
    usernameRef: usernameRef,
    isLoading: isPending,
    handleSubmit: handleSubmit,
  };
}
