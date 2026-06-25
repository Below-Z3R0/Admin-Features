import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-page">
      <Loader2 className="w-10 h-10 text-accent animate-spin" />
      <div className="text-center space-y-1">
        <p className="text-main font-semibold text-base">Iniciando sesión...</p>
        <p className="text-muted text-sm">Verificando tus credenciales</p>
      </div>
    </main>
  );
}
