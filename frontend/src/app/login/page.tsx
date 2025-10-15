'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../hooks/useSession';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const router = useRouter();
  const { refresh } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if(!email) {
      setEmailError("Email is required")
      return;
    }
    setEmailError(null);
    if(!password) {
      setPasswordError("Password is required");
      return;
    }
    setPasswordError(null);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      setError(null);
      setEmailError(null);
      setPasswordError(null);
      await refresh();
      router.push('/');
      router.refresh();
    } else {
      if (response.status === 401) {
        setError("Invalid email or password"); 
      } else {
        try {
          const data = await response.json();
          setError(data.error || "Unexpected error occurred");
        } catch {
          setError("Unexpected error occurred");
        }
      }
    }
  };
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg w-full max-w-sm p-10 b-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Login</h1>

        <form className="text-gray-900" onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            className="w-full p-2 mb-1 border border-gray-300 rounded"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            className="w-full p-2 mb-1 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4 hover:cursor-pointer hover:scale-[1.02] transition" type="submit">Login</button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

      </div>
    </section>
  );
}