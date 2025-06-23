"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get("token");
            setToken(urlToken || "");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const res = await axios.post("/api/users/resetpassword", { token, oldPassword, password });
            setMessage(res.data.message || "Password reset successful.");
            setTimeout(() => router.push("/login"), 2000);
        } catch (error: unknown) {
            if (error instanceof Error) {
                // handle error
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="card max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold mb-4">Reset Password</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="old-password" className="block text-sm font-medium text-gray-300">Old Password</label>
                        <input
                            id="old-password"
                            type="password"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            required
                            className="input-field mt-1"
                            placeholder="Enter old password"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">New Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="input-field mt-1"
                            placeholder="Enter new password"
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading || !password || !oldPassword}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                {message && <div className="bg-green-600 text-white rounded-md p-4 text-center">{message}</div>}
                {error && <div className="bg-red-600 text-white rounded-md p-4 text-center">{error}</div>}
            </div>
        </div>
    );
}