"use client";
import { useSession } from "../hooks/useSession";
import Link from "next/link";
import HowToPlayModal, { useHowToPlay } from "./HowToPlayModal";

export default function Navbar() {
    const { isAuthenticated, logout } = useSession();
    const howToPlay = useHowToPlay();

    return (
        <>
            <nav className="py-3">
                <div className="flex flex-col items-center justify-center relative">
                    <div className="flex flex-row justify-between gap-6 px-4 text-xl">
                        <Link className="hover:text-gray-300" href="/">Home</Link>
                        <button
                            className="hover:cursor-pointer hover:text-gray-300 font-semibold"
                            onClick={howToPlay.open}
                            title="How to Play"
                        >
                            ?
                        </button>
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
            <HowToPlayModal isOpen={howToPlay.isOpen} onClose={howToPlay.close} />
        </>
    )
}