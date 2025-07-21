"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Toast from "@/components/Toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gradient-to-tr from-blue-50 to-purple-100 min-h-screen">
                <Toast />
                <AuthProvider>
                    <Navbar />
                    <main className="max-w-3xl mx-auto p-4 animate-fade-in">{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
