"use client";
import Link from 'next/link';
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from 'axios';


export default function SignupPage() {

  const [user , setUser] = React.useState({
    email: '',
    password: '',
    username: ''
  });

  const onSignup = async () => {

  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        <label htmlFor="username">
          Username:
          <input 
            id="username"
          type="text"
          value={user.username}  
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
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
        <button type="submit" onClick={onSignup}>
          Sign Up
        </button>
      </form>
      <Link href="/login">Already have an account? Log in</Link>
    </div>
  );
}
