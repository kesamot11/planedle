"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            router.push("/login");
        };
        logout();
    }, [router]);

    return <p className="text-center mt-20 min-h-screen text-2xl">Logging out...</p>;
}