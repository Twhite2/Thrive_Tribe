"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle, FaYahoo } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleYahooSignIn = () => {
    // Note: Yahoo provider needs to be added to NextAuth config
    // For demo purposes, we'll use credentials provider instead
    alert("Yahoo authentication would be implemented in production");
    // In production: signIn("yahoo", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={50} height={50} />
          </Link>
          <h1 className="text-3xl font-bold mt-4 text-primary">Welcome Back</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Sign in to continue your wellness journey
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md py-2 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <FaGoogle className="text-red-500" />
              Sign in with Google
            </button>
            
            <button
              onClick={handleYahooSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md py-2 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <FaYahoo className="text-purple-700" />
              Sign in with Yahoo
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:text-primary-dark">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
