"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import AnimatedPage from "@/components/AnimatedPage";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post("/auth/login", { email, password });
            login(res.data.token);
            alert("Login berhasil!");
            router.push("/diary");
        } catch (error) {
            alert("Email atau password salah.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedPage>
            <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-md border border-primary-100">
                <h2 className="text-2xl font-bold text-center text-primary-800 mb-6">Masuk ke Diary App</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        className="w-full border border-primary-200 rounded px-4 py-2"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-full border border-primary-200 rounded px-4 py-2"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="white"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Logging in...
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </AnimatedPage>
    );
}
