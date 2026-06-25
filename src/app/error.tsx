'use client';

import { ErrorPage } from "@/components/organisms/ErrorPage";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Error crítico en la HomePage:", error);
    }, [error]);

    return (
        <ErrorPage
            message="Hubo un problema al conectar con el servidor."
            onRetry={reset}
        />
    );
}
