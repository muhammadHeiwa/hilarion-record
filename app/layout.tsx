"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gradient-to-tr from-blue-50 to-purple-100 min-h-screen">
                <AuthProvider>
                    {/* <nav className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-10">
                        <h1 className="text-lg font-bold text-indigo-600">🌟 Diary App</h1>
                        <div className="space-x-4">
                            {isLoggedIn ? (
                                <>
                                    <Link href="/diary" className="hover:underline text-sm">
                                        Diary
                                    </Link>
                                    <button onClick={logout} className="text-sm text-red-500 hover:underline">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="hover:underline text-sm">
                                        Login
                                    </Link>
                                    <Link href="/register" className="hover:underline text-sm">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav> */}
                    <Navbar />
                    <main className="max-w-3xl mx-auto p-4 animate-fade-in">{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
