"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Perceived Stress Scale questions
const questions = [
  {
    id: 1,
    text: "In the last month, how often have you been upset because of something that happened unexpectedly?",
  },
  {
    id: 2,
    text: "In the last month, how often have you felt that you were unable to control the important things in your life?",
  },
  {
    id: 3,
    text: "In the last month, how often have you felt nervous and stressed?",
  },
  {
    id: 4,
    text: "In the last month, how often have you felt confident about your ability to handle your personal problems?",
    isReversed: true,
  },
  {
    id: 5,
    text: "In the last month, how often have you felt that things were going your way?",
    isReversed: true,
  },
  {
    id: 6,
    text: "In the last month, how often have you found that you could not cope with all the things that you had to do?",
  },
  {
    id: 7,
    text: "In the last month, how often have you been able to control irritations in your life?",
    isReversed: true,
  },
  {
    id: 8,
    text: "In the last month, how often have you felt that you were on top of things?",
    isReversed: true,
  },
  {
    id: 9,
    text: "In the last month, how often have you been angered because of things that were outside your control?",
  },
  {
    id: 10,
    text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
  },
];

// Response options
const responseOptions = [
  { value: 0, label: "Never" },
  { value: 1, label: "Almost Never" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Fairly Often" },
  { value: 4, label: "Very Often" },
];

// Score interpretation
const getScoreInterpretation = (score: number) => {
  if (score <= 13) {
    return {
      level: "Low Stress",
      description: "You're experiencing low levels of stress. Keep up your good coping strategies!",
      color: "text-slate_blue-400",
      bgColor: "bg-slate_blue-100",
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
      color: "text-amethyst-500",
      bgColor: "bg-amethyst-100",
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
      color: "text-persian_pink-500",
      bgColor: "bg-persian_pink-100",
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

export default function Assessment() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(null));
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Move to next question automatically after selection
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    setIsLoading(true);

    setTimeout(() => {
      let totalScore = 0;
      
      answers.forEach((answer, index) => {
        // Handle reversed questions (4, 5, 7, 8)
        const questionObj = questions[index];
        if (questionObj.isReversed) {
          totalScore += 4 - answer; // Reverse the score (0->4, 1->3, 2->2, 3->1, 4->0)
        } else {
          totalScore += answer;
        }
      });

      setScore(totalScore);
      setAssessmentComplete(true);
      setIsLoading(false);
    }, 1500); // Simulate API call
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  const handleViewRecommendations = () => {
    // In a real app, you would save the score to the database
    localStorage.setItem('assessment_score', score?.toString() || '0');
    
    // Navigate to recommendations
    router.push('/recommendations');
  };

  // Start assessment and hide intro
  const startAssessment = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
      <header className="py-4 px-6 bg-white dark:bg-slate_blue-200 shadow-sm">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2 transition-transform duration-300 group-hover:scale-105">
              <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} className="rounded-md" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
            </div>
          </Link>
          {!assessmentComplete && !showIntro && (
            <div className="text-sm text-slate_blue-400 font-medium py-1 px-3 bg-slate_blue-50 rounded-full">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 md:py-12">
        {showIntro ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-purple p-6 text-white">
              <h1 className="text-3xl font-bold">Perceived Stress Scale Assessment</h1>
              <p className="mt-2 opacity-90">A validated tool to measure your current stress levels</p>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="prose dark:prose-invert max-w-none mb-6">
                <p>
                  The Perceived Stress Scale (PSS) is a classic stress assessment instrument originally developed in 1983. 
                  This assessment helps you understand how different situations affect your feelings and perceived stress levels.
                </p>
                
                <h3 className="text-slate_blue-500 mt-6 mb-3">About This Assessment</h3>
                <p>
                  The questions in this assessment ask about your feelings and thoughts during the last month. 
                  For each question, you'll be asked to indicate how often you felt or thought a certain way.
                </p>
                
                <h3 className="text-slate_blue-500 mt-6 mb-3">How to Complete It</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Answer fairly quickly without overthinking.</li>
                  <li>Don't try to count the exact number of times you felt a particular way.</li>
                  <li>Choose the option that seems like a reasonable estimate.</li>
                  <li>There are no right or wrong answers—just be honest about your experiences.</li>
                </ul>
                
                <h3 className="text-slate_blue-500 mt-6 mb-3">What You'll Get</h3>
                <p>
                  After completing all 10 questions, you'll receive a score between 0-40, with an interpretation of your 
                  current stress levels and personalized recommendations to help you manage stress effectively.
                </p>
              </div>
              
              <div className="bg-slate_blue-50 dark:bg-slate_blue-300/20 p-4 rounded-lg mb-8">
                <h4 className="font-medium text-slate_blue-700 dark:text-slate_blue-400 mb-2">Response Options</h4>
                <div className="grid grid-cols-5 gap-2 text-center text-sm">
                  {responseOptions.map((option) => (
                    <div key={option.value} className="py-2">
                      <div className="font-medium text-slate_blue-600">{option.value}</div>
                      <div>{option.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="flex justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  onClick={startAssessment} 
                  className="bg-persian_pink-500 hover:bg-persian_pink-600 text-white py-3 px-8 rounded-full font-medium shadow-md transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>Start Assessment</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : !assessmentComplete ? (
          <div className="w-full max-w-2xl">
            {/* Progress bar */}
            <div className="w-full bg-slate_blue-200 dark:bg-slate_blue-300/30 h-3 rounded-full mb-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="bg-gradient-to-r from-slate_blue-400 to-persian_pink-400 h-3 rounded-full transition-all duration-500"
              ></motion.div>
            </div>

            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-2 text-center text-slate_blue-500">
                Perceived Stress Scale
              </h2>
              <p className="text-slate_blue-400 text-center mb-8 text-sm">Think about how you felt during the last month</p>
              <p className="text-lg mb-8 text-neutral-700 dark:text-slate_blue-700 border-l-4 border-persian_pink-300 pl-4 py-2">
                {questions[currentQuestion].text}
              </p>

              <div className="space-y-3 mt-6">
                {responseOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full py-4 px-5 rounded-lg text-left transition-all duration-300 ${answers[currentQuestion] === option.value 
                      ? "border-2 border-persian_pink-400 bg-persian_pink-50 dark:bg-persian_pink-100/10 text-persian_pink-600 font-medium shadow-md"
                      : "border border-slate_blue-200 dark:border-slate_blue-300 hover:border-persian_pink-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${answers[currentQuestion] === option.value 
                        ? "bg-persian_pink-400 text-white" 
                        : "bg-slate_blue-100 text-slate_blue-400"}
                      `}>
                        {option.value}
                      </div>
                      <span className={answers[currentQuestion] === option.value ? "font-medium" : ""}>{option.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center py-3 px-6 rounded-full shadow transition-all duration-300 ${
                  currentQuestion === 0
                    ? "bg-slate_blue-100 text-slate_blue-300 cursor-not-allowed"
                    : "bg-white text-slate_blue-500 border border-slate_blue-300 hover:bg-slate_blue-50"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                disabled={answers[currentQuestion] === null}
                className={`flex items-center py-3 px-6 rounded-full shadow transition-all duration-300 ${
                  answers[currentQuestion] === null
                    ? "bg-slate_blue-100 text-slate_blue-300 cursor-not-allowed"
                    : "bg-persian_pink-500 hover:bg-persian_pink-600 text-white"
                }`}
              >
                {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                {currentQuestion !== questions.length - 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-12 flex flex-col items-center"
              >
                <div className="w-20 h-20 relative mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-slate_blue-200"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-persian_pink-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-t-slate_blue-400 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
                </div>
                <p className="text-lg text-slate_blue-600 dark:text-slate_blue-400">
                  Analyzing your responses...
                </p>
                <p className="text-sm text-slate_blue-400 mt-2">
                  Calculating your perceived stress score
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`${getScoreInterpretation(score || 0).bgColor} p-6 text-center`}>
                  <h2 className="text-2xl font-bold mb-2 text-slate_blue-600 dark:text-slate_blue-800">
                    Your Assessment Results
                  </h2>
                  <p className="text-slate_blue-500 dark:text-slate_blue-700 text-sm">
                    Perceived Stress Scale Score
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-center my-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      className={`w-48 h-48 rounded-full flex items-center justify-center shadow-lg ${getScoreInterpretation(score || 0).bgColor}`}
                    >
                      <div className="w-40 h-40 rounded-full bg-white dark:bg-slate_blue-100 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className={`text-5xl font-bold ${getScoreInterpretation(score || 0).color}`}
                          >
                            {score}
                          </motion.div>
                          <div className="text-sm text-slate_blue-400">out of 40</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className={`text-2xl font-bold mb-3 text-center ${getScoreInterpretation(score || 0).color}`}>
                      {getScoreInterpretation(score || 0).level}
                    </h3>
                    
                    <p className="text-slate_blue-600 dark:text-slate_blue-500 text-center mb-8 max-w-lg mx-auto">
                      {getScoreInterpretation(score || 0).description}
                    </p>
                  </motion.div>

                  <div className="border-t border-slate_blue-100 dark:border-slate_blue-300/20 pt-6 mt-6">
                    <h4 className="font-semibold mb-4 text-slate_blue-600">Personalized Recommendations:</h4>
                    <ul className="space-y-3 mb-8">
                      {getScoreInterpretation(score || 0).recommendations.map((rec, index) => (
                        <motion.li 
                          key={index} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (index * 0.1) }}
                          className="text-slate_blue-600 dark:text-slate_blue-500 flex items-start"
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
                    <motion.button 
                      onClick={handleViewRecommendations}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-persian_pink-500 hover:bg-persian_pink-600 text-white py-3 px-8 rounded-full font-medium shadow-md transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>View Personalized Resources</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Footer space if needed in the future */}
                  <div className="mt-8"></div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
