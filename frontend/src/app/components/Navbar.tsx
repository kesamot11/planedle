"use client";
import { useSession } from "../hooks/useSession";
import Link from "next/link";

export default function Navbar() {
    const { isAuthenticated, logout } = useSession();
    return (
        <nav className="py-3">
            <div className="flex flex-col items-center justify-center relative">

                <div className="flex flex-row justify-between gap-6 px-4 text-xl">
                    <Link className="hover:text-gray-300" href="/">Home</Link>
                    <div>
                        {isAuthenticated ? (
                            <button className="hover:cursor-pointer hover:text-gray-300" onClick={logout}>Logout</button>
                        ) : (
                            <div className="flex gap-6">
                                <Link className="hover:text-gray-300" href="/register">Register</Link>
                                <Link className="hover:text-gray-300" href="/login">Login</Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}