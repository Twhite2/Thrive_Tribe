"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaRegLightbulb, FaChartBar, FaComments, FaUnlock } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: PlanFeature[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "0",
    billingPeriod: "forever",
    description: "Basic features to get started on your wellness journey",
    features: [
      { text: "Mental health assessment", included: true },
      { text: "Basic personalized recommendations", included: true },
      { text: "Limited content access (3 items per category)", included: true },
      { text: "Weekly email tips", included: true },
      { text: "Progress tracking dashboard", included: false },
      { text: "Unlimited content library", included: false },
      { text: "Professional chat support", included: false },
      { text: "Advanced analytics and insights", included: false },
    ],
    ctaText: "Current Plan",
    ctaLink: "/dashboard",
  },
  {
    name: "Premium",
    price: "9.99",
    billingPeriod: "monthly",
    description: "Enhanced features for a comprehensive wellness experience",
    features: [
      { text: "Mental health assessment", included: true },
      { text: "Advanced personalized recommendations", included: true },
      { text: "Unlimited content access", included: true },
      { text: "Weekly email tips", included: true },
      { text: "Progress tracking dashboard", included: true },
      { text: "Content download options", included: true },
      { text: "Professional chat support", included: true },
      { text: "Advanced analytics and insights", included: true },
    ],
    ctaText: "Subscribe Now",
    ctaLink: "/premium/checkout",
    popular: true,
  },
];

export default function Premium() {
  const { isPremium } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const handleBillingPeriodChange = (period: "monthly" | "annual") => {
    setBillingPeriod(period);
  };

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
          <nav className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-neutral-600 hover:text-primary dark:text-neutral-300">
              Dashboard
            </Link>
            <Link href="/assessment" className="text-neutral-600 hover:text-primary dark:text-neutral-300">
              Assessment
            </Link>
            <Link href="/recommendations" className="text-neutral-600 hover:text-primary dark:text-neutral-300">
              Recommendations
            </Link>
            <Link
              href="/premium"
              className="text-primary border-b-2 border-primary font-medium"
            >
              Premium
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Link href="/profile" className="text-neutral-600 hover:text-primary dark:text-neutral-300">
              Profile
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary-dark to-accent text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Unlock Your Full Potential</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Get unlimited access to premium content, advanced features, and professional support to accelerate your wellness journey
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center p-1 bg-white/20 rounded-lg">
                <button
                  onClick={() => handleBillingPeriodChange("monthly")}
                  className={`px-4 py-2 rounded-md text-sm ${
                    billingPeriod === "monthly"
                      ? "bg-white text-primary"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => handleBillingPeriodChange("annual")}
                  className={`px-4 py-2 rounded-md text-sm ${
                    billingPeriod === "annual"
                      ? "bg-white text-primary"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Annual
                  <span className="ml-1 text-xs font-medium">
                    (Save 20%)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden border ${
                    plan.popular
                      ? "border-accent"
                      : "border-transparent"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-neutral-500 ml-2">/{plan.billingPeriod}</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className={`flex items-start ${
                            !feature.included
                              ? "text-neutral-400 line-through"
                              : ""
                          }`}
                        >
                          <span className="mr-2 mt-1 text-sm">
                            <FaCheck
                              className={
                                feature.included
                                  ? "text-green-500"
                                  : "text-neutral-400"
                              }
                            />
                          </span>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.name === "Free" ? (
                      isPremium ? (
                        <button
                          disabled
                          className="w-full py-3 px-4 bg-neutral-200 text-neutral-500 rounded-md cursor-not-allowed"
                        >
                          Current Plan
                        </button>
                      ) : (
                        <Link
                          href={plan.ctaLink}
                          className="block w-full py-3 px-4 bg-neutral-200 text-neutral-700 rounded-md text-center"
                        >
                          {plan.ctaText}
                        </Link>
                      )
                    ) : isPremium ? (
                      <button
                        disabled
                        className="w-full py-3 px-4 bg-neutral-200 text-neutral-500 rounded-md cursor-not-allowed"
                      >
                        Current Plan
                      </button>
                    ) : (
                      <Link
                        href={plan.ctaLink}
                        className={`block w-full py-3 px-4 rounded-md text-center ${
                          plan.popular
                            ? "bg-accent text-white hover:bg-accent-dark"
                            : "bg-primary text-white hover:bg-primary-dark"
                        }`}
                      >
                        {plan.ctaText}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-neutral-100 dark:bg-neutral-800">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <span className="p-3 bg-primary/10 rounded-full text-primary text-xl">
                    <FaUnlock />
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Unlimited Content</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-center">
                  Access our entire library of videos, articles, and tools without any limits
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <span className="p-3 bg-secondary/10 rounded-full text-secondary text-xl">
                    <FaRegLightbulb />
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Advanced Recommendations</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-center">
                  Get more personalized suggestions tailored to your specific needs
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <span className="p-3 bg-accent/10 rounded-full text-accent text-xl">
                    <FaChartBar />
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Progress Tracking</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-center">
                  Monitor your improvement over time with detailed analytics and insights
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <span className="p-3 bg-primary-dark/10 rounded-full text-primary-dark text-xl">
                    <FaComments />
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Professional Support</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-center">
                  Chat with mental health professionals for guidance and advice
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Sarah J.</h4>
                    <p className="text-sm text-neutral-500">Premium Member</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 italic">
                  "The premium features have made a real difference in my wellness journey. The progress tracking helps me see how far I've come!"
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Michael T.</h4>
                    <p className="text-sm text-neutral-500">Premium Member</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 italic">
                  "Being able to chat with professionals when I'm feeling overwhelmed has been a game-changer for my mental health."
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Aisha K.</h4>
                    <p className="text-sm text-neutral-500">Premium Member</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 italic">
                  "The advanced recommendations feel like they were made just for me. I've discovered techniques that really work for my situation."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-neutral-100 dark:bg-neutral-800">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">How does the premium subscription work?</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Once you subscribe, you'll immediately get access to all premium features including unlimited content, progress tracking, and professional support. You can cancel anytime from your account settings.
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">Can I switch between monthly and annual billing?</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Yes, you can switch between billing periods from your account settings. If you switch from monthly to annual, you'll start saving immediately. If you switch from annual to monthly, the change will take effect at your next renewal date.
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">Is my payment information secure?</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Absolutely. We use Stripe, a PCI-compliant payment processor, to handle all payments securely. Your payment information is never stored on our servers.
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">How do I cancel my subscription?</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  You can cancel your subscription anytime from your account settings. After cancellation, you'll continue to have access to premium features until the end of your current billing period.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Premium Journey Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Unlock all premium features and take your mental wellbeing to the next level
            </p>
            <Link
              href="/premium/checkout"
              className="btn bg-white text-primary hover:bg-neutral-100 text-lg px-8 py-3 shadow-lg"
            >
              Subscribe Now
            </Link>
          </div>
        </section>
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
