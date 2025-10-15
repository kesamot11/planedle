"use client";

import React, { useState } from 'react';
import { register } from '../api/authApi';


export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [err, setErr] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function clearAllErrors() {
        setUsernameError(null);
        setEmailError(null);
        setPasswordError(null);
        setConfirmError(null);
    }   

    async function handleSubmit(event) {
        event.preventDefault();
        clearAllErrors();
        
        if(!username) {
            setUsernameError('Username is required');
            return;
        }
        setUsernameError(null);
        if(!email) {
            setEmailError('Email is required');
            return;
        }
        setEmailError(null);
        if(!password) {
            setPasswordError('Password is required');
            return;
        }
        setPasswordError(null);
        if(!confirm) {
            setConfirmError('Please confirm your password');
            return;
        }
        setConfirmError(null);
        if(username.length < 5) {
            setUsernameError('Username must be at least 5 characters long');
            return;
        }
        setUsernameError(null);
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setEmailError('Invalid email address');
            return;
        }
        setEmailError(null);
        if(!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter and one number');
            return;
        }
        setPasswordError(null);
        if (password !== confirm) {
            setConfirmError('Passwords do not match');
            return;
        }
        setConfirmError(null);
        try {
            await register(username, email, password);
            setSuccessMessage('Registration successful! You can now log in.');
            setErr(null);
            setConfirmError(null);
            setPasswordError(null);
            setEmailError(null);
            setUsernameError(null);
        } catch (e) {
            const field = e?.field;
            const message = e?.message || "Registration failed";
            if (field === "email") setEmailError(message);
            else if (field === "username") setUsernameError(message);
            else setErr(message);
                setSuccessMessage(null)
            }
    }
        



    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg w-full max-w-sm p-10 b-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Register</h1>
                <form className="text-gray-900" onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                    <input className="w-full p-2 mb-1 border border-gray-300 rounded" type="text" id="username" name="username" onChange={e => setUsername(e.target.value)} />
                    {usernameError && <p className="text-red-500 text-sm mb-2 transition">{usernameError}</p>}
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input className="w-full p-2 mb-1 border border-gray-300 rounded" type="email" id="email" name="email" onChange={e => setEmail(e.target.value)} />
                    {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <input className="w-full p-2 mb-1 border border-gray-300 rounded" type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
                    {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="confirm">Confirm Password</label>
                    <input className="w-full p-2 mb-1 border border-gray-300 rounded" type="password" id="confirm" name="confirm" onChange={e => setConfirm(e.target.value)} />
                    {confirmError && <p className="text-red-500 text-sm mb-2">{confirmError}</p>}
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4 hover:cursor-pointer hover:scale-[1.02] transition" type="submit">Register</button>
                    {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
                    {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                </form>

            </div>            
        </section>
    );
}