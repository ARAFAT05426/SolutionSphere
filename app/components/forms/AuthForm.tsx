"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "../inputFields/TextInput";
import ActionButton from "../buttons/ActionButton";
import { useAuth } from "@/app/contexts/AuthProvider";
import PasswordInput from "../inputFields/PasswordInput";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { login, signup } = useAuth();

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setError(null);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
        const username = (e.currentTarget.elements.namedItem("username") as HTMLInputElement).value;
        const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

        try {
            await signup({ name, username, email, password });
            setError(null);
            router.push("/dashboard");
        } catch (error) {
            console.error("Registration Error:", error);
            setError("Registration failed. Please check your input and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

        try {
            await login({ email, password });
            setError(null);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
            setError("Login failed. Please check your email and password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm bg-white p-5 rounded">
            <div className="w-fit mx-auto flex items-center gap-1.5 mb-2.5">
                <button
                    className={`uppercase ${isLogin ? "font-extrabold text-2xl" : ""}`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                |
                <button
                    className={`uppercase ${!isLogin ? "font-extrabold text-2xl" : ""}`}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </button>
            </div>
            {isLogin ? (
                <div className="flex flex-col">
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="space-y-2.5 mb-2.5" onSubmit={handleLogin}>
                        <TextInput name="email" placeholder="Email *" required />
                        <PasswordInput name="password" placeholder="Password *" required />
                        <ActionButton type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </ActionButton>
                    </form>
                    <span className="text-center mt-2.5 text-xs">
                        Not a Member?{" "}
                        <button className="underline" onClick={handleToggle}>
                            Register Now.
                        </button>
                    </span>
                </div>
            ) : (
                <div className="flex flex-col">
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="space-y-2.5 mb-2.5" onSubmit={handleRegister}>
                        <TextInput name="name" placeholder="Your Name *" required />
                        <TextInput name="username" placeholder="Username *" required />
                        <TextInput name="email" placeholder="Email address *" type="email" required />
                        <PasswordInput name="password" placeholder="Password *" required />
                        <ActionButton type="submit" className="w-full" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </ActionButton>
                    </form>
                    <span className="text-center mt-2.5 text-xs">
                        Already a Member?{" "}
                        <button className="underline" onClick={handleToggle}>
                            Login Here.
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
}
