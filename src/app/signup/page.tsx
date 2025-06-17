"use client";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from 'axios';

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: ''
  });

  const onSignup = async () => {

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="card max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Choose a username"
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Create a password"
                required
                className="input-field"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={onSignup}
              className="btn-primary w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
