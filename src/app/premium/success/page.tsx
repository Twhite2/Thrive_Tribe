"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function SubscriptionSuccess() {
  // In a real app, this would update the user's subscription status in the database
  useEffect(() => {
    // Simulated API call to update subscription status
    const updateSubscriptionStatus = async () => {
      console.log("Updating subscription status...");
      // In a real app, this would be an API call
    };

    updateSubscriptionStatus();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <header className="py-4 px-6 bg-white dark:bg-neutral-800 shadow-sm">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} />
                <span className="text-lg font-bold text-primary">Thrive Tribe</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Subscription Successful!</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Thank you for subscribing to Thrive Tribe Premium. You now have access to all premium features.
          </p>
          
          <div className="bg-neutral-50 dark:bg-neutral-700 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">What's Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <span className="flex-shrink-0 text-green-500 mr-3 text-lg">✓</span>
                <div>
                  <h3 className="font-medium">Explore Premium Content</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Dive into our complete library of videos, articles, and tools
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 text-green-500 mr-3 text-lg">✓</span>
                <div>
                  <h3 className="font-medium">Track Your Progress</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Access your premium dashboard to monitor your wellness journey
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 text-green-500 mr-3 text-lg">✓</span>
                <div>
                  <h3 className="font-medium">Connect with Professionals</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Chat with our mental health experts when you need guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            A confirmation email has been sent to your email address with your subscription details.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/dashboard" 
              className="btn-primary"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/recommendations" 
              className="btn bg-white text-primary border border-primary hover:bg-neutral-100"
            >
              View Recommendations
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="bg-neutral-800 text-neutral-300 py-6">
        <div className="container-custom">
          <div className="border-t border-neutral-700 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} Thrive Tribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
