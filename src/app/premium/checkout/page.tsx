"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key (this would come from environment variables in production)
const stripePromise = loadStripe("pk_test_placeholder_key");

// Checkout form component
const CheckoutForm = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  // Calculate price based on billing period
  const prices = {
    monthly: {
      amount: 9.99,
      formatted: "$9.99",
    },
    annual: {
      amount: 95.88, // $7.99 x 12 (20% off)
      formatted: "$95.88",
    },
  };

  const handleBillingPeriodChange = (period: "monthly" | "annual") => {
    setBillingPeriod(period);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsLoading(true);
    setError(null);

    try {
      // In a real application, this would create a payment intent on your backend
      // Then use the client secret to confirm the payment

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful payment and redirect
      router.push("/premium/success");

      // In a real implementation, it would look something like:
      /*
      const { clientSecret } = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: prices[billingPeriod].amount,
          currency: 'usd',
          billingPeriod,
        }),
      }).then(res => res.json());

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        },
      });

      if (error) {
        setError(error.message || 'An error occurred with your payment');
      } else if (paymentIntent.status === 'succeeded') {
        router.push('/premium/success');
      }
      */
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
        
        {/* Billing period selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Billing Period
          </label>
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => handleBillingPeriodChange("monthly")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
                billingPeriod === "monthly"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => handleBillingPeriodChange("annual")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
                billingPeriod === "annual"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600"
              }`}
            >
              Annual
              <span className="ml-1 text-xs">
                (Save 20%)
              </span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600 dark:text-neutral-400">
              {billingPeriod === "monthly" ? "Monthly subscription" : "Annual subscription"}
            </span>
            <span className="font-medium">{prices[billingPeriod].formatted}</span>
          </div>
          {billingPeriod === "annual" && (
            <div className="flex justify-between mb-2 text-green-600 text-sm">
              <span>Savings (20% off)</span>
              <span>-$23.88</span>
            </div>
          )}
          <div className="flex justify-between font-bold pt-2 border-t border-neutral-200 dark:border-neutral-700 mt-2">
            <span>Total</span>
            <span>{prices[billingPeriod].formatted}</span>
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-2">
            {billingPeriod === "monthly"
              ? "You'll be charged $9.99 every month."
              : "You'll be charged $95.88 once a year."}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Card Information
            </label>
            <div className="border border-neutral-300 dark:border-neutral-600 rounded-md p-3 bg-white dark:bg-neutral-700">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
                onChange={handleCardChange}
              />
            </div>
            {cardError && (
              <p className="text-red-500 text-sm mt-1">{cardError}</p>
            )}
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-2">
              Secured by Stripe. We do not store your card details.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={isLoading || !stripe}
          className={`btn-primary py-3 px-4 flex justify-center items-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            `Subscribe for ${prices[billingPeriod].formatted} ${
              billingPeriod === "monthly" ? "/month" : "/year"
            }`
          )}
        </button>
        <Link href="/premium" className="text-primary dark:text-primary-light text-center text-sm hover:underline">
          Cancel and return to Premium page
        </Link>
      </div>

      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        By subscribing, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </form>
  );
};

export default function Checkout() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <header className="py-4 px-6 bg-white dark:bg-neutral-800 shadow-sm">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2 transition-transform duration-300 group-hover:scale-105">
              <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} className="rounded-md" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="container-custom py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Subscription</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter your details below to subscribe to Thrive Tribe Premium
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
          <div>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Premium Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                  <span>Unlimited content access</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                  <span>Advanced personalized recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                  <span>Progress tracking dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                  <span>Content download options</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                  <span>Professional chat support</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                  <span>Advanced analytics and insights</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Secure payment with Stripe
                  </span>
                </div>
              </div>

              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                <p>
                  You can cancel your subscription at any time from your account settings.
                </p>
              </div>
            </div>
          </div>
        </div>
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
