'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">500 - Something went wrong!</h1>
                    <p className="mt-4">We encountered an error on our servers.</p>
                    <button
                        onClick={() => reset()}
                        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
} 