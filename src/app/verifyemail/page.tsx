"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string | false>(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
        } catch (err: unknown) {
            if (
                err &&
                typeof err === 'object' &&
                'response' in err &&
                err.response &&
                typeof err.response === 'object' &&
                'data' in err.response &&
                err.response.data &&
                typeof err.response.data === 'object' &&
                'error' in err.response.data
            ) {
                setError((err.response as { data?: { error?: string } }).data?.error || "Something went wrong.");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="card max-w-xl w-full space-y-8 p-10">
                <div>
                    <h1 className="text-center text-3xl font-extrabold mb-2">Verify Email</h1>
                    {token ? (
                        <div className="flex justify-center mb-4">
                            <span className="px-4 py-2 rounded-md bg-orange-500 text-black font-mono text-lg font-bold shadow-md">
                                {token}
                            </span>
                        </div>
                    ) : (
                        <h2 className="text-center text-md text-gray-400 mb-4">No token found</h2>
                    )}
                </div>
                {verified && (
                    <div className="bg-green-600 text-white rounded-md p-4 text-center">
                        <h2 className="text-2xl font-bold mb-2">Email Verified</h2>
                        <Link href="/login" className="btn-primary inline-block mt-2">
                            Login
                        </Link>
                    </div>
                )}
                {error && (
                    <div className="bg-red-600 text-white rounded-md p-4 text-center">
                        <h2 className="text-2xl font-bold">Verification Error</h2>
                        <p className="mt-2">{error}</p>
                    </div>
                )}
            </div>
        </div>
    )
}