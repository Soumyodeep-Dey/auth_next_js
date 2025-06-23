"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const res = await axios.post("/api/users/forgotpassword", { email });
            setMessage(res.data.message || "Check your email for reset instructions.");
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data) {
                setError((err.response as any).data.error || "Something went wrong.");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="card max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold mb-4">Forgot Password</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="input-field mt-1"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading || !email}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                {message && <div className="bg-green-600 text-white rounded-md p-4 text-center">{message}</div>}
                {error && <div className="bg-red-600 text-white rounded-md p-4 text-center">{error}</div>}
            </div>
        </div>
    );
} 