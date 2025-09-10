"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Link from "next/link";

// Score interpretation (same as in assessment page)
const getScoreInterpretation = (score: number) => {
  if (score <= 13) {
    return {
      level: "Low Stress",
      description: "You're experiencing low levels of stress. Keep up your good coping strategies!",
      color: "text-slate_blue-400 dark:text-slate_blue-300",
      bgColor: "bg-slate_blue-100 dark:bg-slate_blue-600/30",
      recommendations: [
        "Continue with your current self-care practices",
        "Consider preventative strategies to maintain your wellbeing",
        "Practice mindfulness to stay aware of your stress levels",
        "Use relaxation techniques to maintain your current state",
      ],
    };
  } else if (score <= 26) {
    return {
      level: "Moderate Stress",
      description: "You're experiencing moderate levels of stress. Some additional coping strategies might help.",
      color: "text-amethyst-500 dark:text-amethyst-300",
      bgColor: "bg-amethyst-100 dark:bg-amethyst-600/30",
      recommendations: [
        "Try incorporating brief relaxation exercises into your daily routine",
        "Consider setting boundaries to protect your energy",
        "Practice regular physical activity to reduce tension",
        "Explore breathing exercises to calm your nervous system",
        "Consider journaling to identify stress triggers",
      ],
    };
  } else {
    return {
      level: "High Stress",
      description: "You're experiencing high levels of stress. It's important to prioritize stress management.",
      color: "text-persian_pink-500 dark:text-persian_pink-300",
      bgColor: "bg-persian_pink-100 dark:bg-persian_pink-600/30",
      recommendations: [
        "Consider implementing daily stress reduction practices",
        "Evaluate your current commitments and consider where you might reduce load",
        "Reach out for social support or professional help if needed",
        "Prioritize adequate sleep and nutrition",
        "Schedule regular breaks throughout your day",
        "Try guided meditation or progressive muscle relaxation",
      ],
    };
  }
};

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session } = useAuth();
  const isLoggedIn = !!session?.user;

  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }

    // Get score from URL params or localStorage
    let scoreValue = searchParams.get("score");
    
    if (!scoreValue) {
      // Try to get from localStorage
      const storedScore = localStorage.getItem("assessment_score");
      if (storedScore) {
        scoreValue = storedScore;
      }
    }

    if (scoreValue) {
      setScore(parseInt(scoreValue, 10));
    }
    
    setLoading(false);
  }, [isLoggedIn, router, searchParams]);

  // If not logged in, redirect will happen in useEffect
  if (!isLoggedIn) {
    return <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex items-center justify-center">
      <div className="text-center">Checking authentication status...</div>
    </div>;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 rounded-full border-4 border-slate_blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-persian_pink-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-slate_blue-400 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
          </div>
        </main>
      </div>
    );
  }

  // If no score found after loading completes, redirect to assessment
  if (score === null) {
    return (
      <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-4 text-slate_blue-600 dark:text-slate_blue-100">No Assessment Found</h1>
            <p className="text-slate_blue-500 dark:text-slate_blue-200 mb-6">
              We couldn't find your assessment results. Would you like to take the assessment now?
            </p>
            <Link href="/assessment" className="bg-persian_pink-500 hover:bg-persian_pink-600 text-white py-3 px-8 rounded-full font-medium shadow-md transition-colors duration-300 inline-flex items-center">
              Take Assessment
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Show results
  const interpretation = getScoreInterpretation(score);

  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg overflow-hidden max-w-2xl w-full"
        >
          <div className={`${interpretation.bgColor} p-6 text-center`}>
            <h2 className="text-2xl font-bold mb-2 text-slate_blue-600 dark:text-slate_blue-100">
              Your Assessment Results
            </h2>
            <p className="text-slate_blue-500 dark:text-slate_blue-300 text-sm">
              Perceived Stress Scale Score
            </p>
          </div>
          
          <div className="p-8">
            <div className="flex justify-center my-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="relative w-32 h-32 bg-slate_blue-900 rounded-full flex items-center justify-center shadow-lg"
              >
                <div className="absolute inset-0 border-4 border-persian_pink-200 dark:border-persian_pink-300 rounded-full opacity-90"></div>
                <div className="text-center text-white">
                  <div className="text-5xl font-bold">{score}</div>
                  <div className="text-xs opacity-90">out of 40</div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className={`text-2xl font-bold mb-3 text-center ${interpretation.color}`}>
                {interpretation.level}
              </h3>
              
              <p className="text-slate_blue-600 dark:text-slate_blue-100 text-center mb-8 max-w-lg mx-auto">
                {interpretation.description}
              </p>
            </motion.div>

            <div className="border-t border-slate_blue-100 dark:border-slate_blue-300/20 pt-6 mt-6">
              <h4 className="font-semibold mb-4 text-slate_blue-600 dark:text-white">Personalized Recommendations:</h4>
              <ul className="space-y-3 mb-8">
                {interpretation.recommendations.map((rec, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    className="text-slate_blue-600 dark:text-slate_blue-100 flex items-start"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-persian_pink-500 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center mt-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/dashboard" className="bg-persian_pink-500 hover:bg-persian_pink-600 text-white py-3 px-8 rounded-full font-medium shadow-md transition-colors duration-300 flex items-center space-x-2">
                  <span>Go to Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
