'use client'
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Paragraph, Title2 } from "../server-components";
import type { ErrorPageProps } from "../types";

export function ErrorPage({ message, onRetry }: ErrorPageProps) {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-200 w-full flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card border border-border-subtle rounded-2xl p-8 shadow-xl flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-300">

        {/* Icono con resplandor de advertencia */}
        <div className="relative">
          <div className="absolute inset-0 bg-warning-soft blur-2xl rounded-full" />
          <div className="relative bg-warning-soft p-4 rounded-full border border-warning/20">
            <AlertCircle className="w-12 h-12 text-warning" />
          </div>
        </div>

        {/* Texto informativo */}
        <div className="space-y-2">
          <Title2 className="text-2xl font-display font-bold text-main" txt="¡Ups! Algo salió mal" />
          <Paragraph className="text-dim text-sm leading-relaxed" txt={message} />

        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">

          <Button
            onClick={onRetry}
            txt="Reintentar"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-main rounded-lg font-medium hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-accent/20"
          >
            <RefreshCcw className="w-4 h-4" />
          </Button>


          <Button
            onClick={goHome}
            txt="Inicio"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-surface border border-border-subtle text-main rounded-lg font-medium hover:bg-card transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>

        {/* Detalle sutil de decoración */}
        <div className="pt-4">
          <div className="h-1 w-12 bg-border-glow-warning/30 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
