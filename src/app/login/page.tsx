"use client";
import Link from 'next/link';
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from 'axios';


export default function SignupPage() {

  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {

  };

  return (
    <div>
      <h1>Log In</h1>
      <hr />
      <form>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            required />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            required />
        </label>
        <hr />
        <button type="submit" onClick={onLogin}>
          Log In
        </button>
      </form>
      <Link href="/signup">Don't have an account? Sign up</Link>
    </div>
  );
}
