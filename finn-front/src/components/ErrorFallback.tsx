import { useNavigate } from "react-router";
import { useEffect } from "react";

interface Props {
  error: Error;
}

export default function ErrorFallBack({ error }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    console.error("Unhandled Error", error);
    navigate("/error");
  }, [error, navigate]);

  return null;
}
