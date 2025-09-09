"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { SiYahoo } from "react-icons/si";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate form
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }

    try {
      // In a real application, you would send this data to your API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      
      // Check if response is ok before attempting to parse JSON
      let data;
      try {
        const text = await response.text(); // Get response as text first
        data = text ? JSON.parse(text) : {}; // Parse if not empty
      } catch (error) {
        console.error("Error parsing response:", error);
        throw new Error("Server returned an invalid response. Please try again.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      // Sign in the user after successful registration
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // Redirect to onboarding
      router.push("/onboarding");
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/onboarding" });
  };

  const handleYahooSignUp = () => {
    // Note: Yahoo provider needs to be added to NextAuth config
    // For demo purposes, we'll show an alert
    alert("Yahoo authentication would be implemented in production");
    // In production: signIn("yahoo", { callbackUrl: "/onboarding" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={50} height={50} />
          </Link>
          <h1 className="text-3xl font-bold mt-4 text-primary">Join Thrive Tribe</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Create an account to start your wellness journey
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3 mb-4">
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md py-2 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <FaGoogle className="text-red-500" />
              Sign up with Google
            </button>
            
            <button
              onClick={handleYahooSignUp}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md py-2 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <SiYahoo className="text-purple-700" />
              Sign up with Yahoo
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500">
                Or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} method="post">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>

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
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Min. 8 characters"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-neutral-600 dark:text-neutral-400">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:text-primary-dark font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary-dark font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
