import { LoaderCircle } from "lucide-react";
interface Props {
  success?: boolean;
  successMessage?: string;
  waitingMessage?: string;
}
export default function Loader({
  success = true,
  successMessage = "Redirigiendo...",
  waitingMessage = "Procesando...",
}: Props) {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-4">
      <div className="top fixed justify-center space-y-4">
        <div className="text-center">
          <LoaderCircle size={120} className="animate-spin text-cyan-600 duration-500" />
        </div>
        {success ? (
          <p className="text-xl font-semibold">{successMessage}</p>
        ) : (
          <p className="text-xl font-semibold">{waitingMessage}</p>
        )}
      </div>
    </div>
  );
}
