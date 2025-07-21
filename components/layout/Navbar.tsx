"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-10">
            <Link href="/" className="text-lg font-bold text-indigo-600">
                🌟 Diary App
            </Link>

            <div className="space-x-4">
                {isLoggedIn ? (
                    <>
                        <Link href="/diary" className="text-sm">
                            Diary
                        </Link>
                        <button onClick={logout} className="text-sm text-red-500">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-sm mr-4">
                            Login
                        </Link>
                        <Link href="/register" className="text-sm">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
