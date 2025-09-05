"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

// Mock data for user's assessment history
const mockAssessmentHistory = [
  { date: '2025-09-01', score: 18, level: 'Moderate Stress' },
  { date: '2025-08-15', score: 25, level: 'Moderate Stress' },
  { date: '2025-08-01', score: 29, level: 'High Stress' },
  { date: '2025-07-15', score: 32, level: 'High Stress' },
  { date: '2025-07-01', score: 27, level: 'High Stress' },
  { date: '2025-06-15', score: 24, level: 'Moderate Stress' },
];

// Mock data for recent activity
const mockRecentActivity = [
  {
    id: '1',
    type: 'assessment',
    date: '2025-09-01',
    title: 'Completed Stress Assessment',
    description: 'Score: 18 - Moderate Stress',
  },
  {
    id: '2',
    type: 'resource',
    date: '2025-08-30',
    title: 'Guided Meditation for Anxiety Relief',
    description: 'Completed 10-minute meditation',
  },
  {
    id: '3',
    type: 'exercise',
    date: '2025-08-28',
    title: 'Progressive Muscle Relaxation',
    description: 'Completed 8-minute exercise',
  },
  {
    id: '4',
    type: 'article',
    date: '2025-08-25',
    title: 'Understanding Stress: Causes and Effects',
    description: 'Read article - 5 min read',
  },
];

// Mock data for recommended resources
const mockRecommendations = [
  {
    id: '1',
    title: '5-Minute Breathing Exercise',
    type: 'exercise',
    description: 'A quick breathing technique for instant calm',
    link: '/resources/exercises/breathing-technique',
  },
  {
    id: '2',
    title: 'Understanding Cognitive Distortions',
    type: 'video',
    description: 'Learn to identify negative thought patterns',
    link: '/resources/videos/cognitive-distortions',
    premium: true,
  },
  {
    id: '3',
    title: 'Building Emotional Resilience',
    type: 'article',
    description: 'Develop skills to bounce back from challenges',
    link: '/resources/articles/emotional-resilience',
  },
];

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Activity type icons
const activityIcons = {
  assessment: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate_blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  resource: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-persian_pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  exercise: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amethyst-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  article: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-african_violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  meditation: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate_blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
};

export default function Dashboard() {
  const { session, isPremium } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate stress level improvement
  const latestScore = mockAssessmentHistory[0].score;
  const firstScore = mockAssessmentHistory[mockAssessmentHistory.length - 1].score;
  const improvement = firstScore - latestScore;
  const improvementPercentage = Math.round((improvement / firstScore) * 100);

  // Calculate streak (mock data)
  const streak = 5; // 5 days streak

  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100">
      {/* Header */}
      <header className="py-4 px-6 bg-white dark:bg-slate_blue-200 shadow-sm">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2 transition-transform duration-300 group-hover:scale-105">
              <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} className="rounded-md" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-persian_pink-500 font-medium">Dashboard</Link>
            <Link href="/assessment" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">Assessment</Link>
            <Link href="/resources" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">Resources</Link>
            {isPremium && (
              <Link href="/premium" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">Premium</Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {!isPremium && (
              <Link href="/premium" className="hidden md:block text-sm px-3 py-1 rounded-full bg-persian_pink-100 text-persian_pink-500 font-medium hover:bg-persian_pink-200 transition-colors duration-300">
                Upgrade
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate_blue-200 flex items-center justify-center text-slate_blue-600 font-medium">
                {session?.user?.name?.[0] || 'U'}
              </div>
              <span className="text-sm font-medium text-slate_blue-600 hidden md:inline">
                {session?.user?.name || 'User'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate_blue-700 dark:text-slate_blue-400">
              Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-slate_blue-500 dark:text-slate_blue-500 mt-1">
              Track your progress and continue your mental wellness journey
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/assessment'}
              className="btn bg-persian_pink-500 hover:bg-persian_pink-600 text-white py-2 px-4 rounded-full font-medium shadow transition-all duration-300"
            >
              Take Assessment
            </motion.button>
          </div>
        </div>

        {/* Dashboard tabs */}
        <div className="mb-6 border-b border-slate_blue-200 dark:border-slate_blue-300/20">
          <div className="flex space-x-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 px-1 text-sm font-medium transition-colors duration-300 ${
                activeTab === 'overview'
                  ? 'border-b-2 border-persian_pink-500 text-persian_pink-500'
                  : 'text-slate_blue-400 hover:text-slate_blue-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`pb-2 px-1 text-sm font-medium transition-colors duration-300 ${
                activeTab === 'progress'
                  ? 'border-b-2 border-persian_pink-500 text-persian_pink-500'
                  : 'text-slate_blue-400 hover:text-slate_blue-700'
              }`}
            >
              Progress
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`pb-2 px-1 text-sm font-medium transition-colors duration-300 ${
                activeTab === 'activity'
                  ? 'border-b-2 border-persian_pink-500 text-persian_pink-500'
                  : 'text-slate_blue-400 hover:text-slate_blue-700'
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`pb-2 px-1 text-sm font-medium transition-colors duration-300 ${
                activeTab === 'recommendations'
                  ? 'border-b-2 border-persian_pink-500 text-persian_pink-500'
                  : 'text-slate_blue-400 hover:text-slate_blue-700'
              }`}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariant}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                variants={itemVariant}
                className="bg-white dark:bg-slate_blue-200 p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate_blue-500">Current Stress Level</h3>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl font-bold text-slate_blue-700 dark:text-slate_blue-400">{latestScore}</p>
                      <p className="ml-2 text-sm text-slate_blue-500">/ 40</p>
                    </div>
                    <p className="text-sm mt-1 text-slate_blue-500">{mockAssessmentHistory[0].level}</p>
                  </div>
                  <div className="w-12 h-12 bg-slate_blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate_blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariant} 
                className="bg-white dark:bg-slate_blue-200 p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-persian_pink-500">Improvement</h3>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl font-bold text-persian_pink-500">
                        {improvementPercentage}%
                      </p>
                      <p className="ml-2 text-sm text-persian_pink-400">
                        Last {mockAssessmentHistory.length} assessments
                      </p>
                    </div>
                    <p className="text-sm mt-1 text-slate_blue-500">
                      {improvement > 0 ? 'Decreasing stress levels' : 'Stable stress levels'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-persian_pink-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-persian_pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariant} 
                className="bg-white dark:bg-slate_blue-200 p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-amethyst-500">Current Streak</h3>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl font-bold text-amethyst-500">{streak}</p>
                      <p className="ml-2 text-sm text-amethyst-400">days</p>
                    </div>
                    <p className="text-sm mt-1 text-slate_blue-500">Keep it up!</p>
                  </div>
                  <div className="w-12 h-12 bg-amethyst-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amethyst-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Recent Activity Section */}
            <motion.div variants={itemVariant} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate_blue-700 dark:text-slate_blue-400">Recent Activity</h2>
                <button className="text-sm text-persian_pink-500 hover:underline">View All</button>
              </div>
              <div className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-md p-6">
                <div className="space-y-4">
                  {mockRecentActivity.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-start pb-4 last:pb-0 last:border-none border-b border-slate_blue-100">
                      <div className="flex-shrink-0 mr-4">
                        {activityIcons[activity.type as keyof typeof activityIcons]}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-slate_blue-700 dark:text-slate_blue-400">{activity.title}</p>
                        <p className="text-sm text-slate_blue-500">{activity.description}</p>
                        <p className="text-xs text-slate_blue-400 mt-1">
                          {new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {mockRecentActivity.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-slate_blue-400">No recent activity</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Recommended Resources */}
            <motion.div variants={itemVariant}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate_blue-700 dark:text-slate_blue-400">Recommended For You</h2>
                <Link href="/resources" className="text-sm text-persian_pink-500 hover:underline">
                  Browse All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockRecommendations.map((resource) => (
                  <div key={resource.id} className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-md overflow-hidden">
                    <div className="h-4 bg-gradient-to-r from-slate_blue-400 to-persian_pink-400"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-slate_blue-700 dark:text-slate_blue-400">{resource.title}</h3>
                        {resource.premium && !isPremium && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-persian_pink-100 text-persian_pink-500">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate_blue-500 mb-4">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase font-medium text-slate_blue-400">
                          {resource.type}
                        </span>
                        <Link 
                          href={resource.premium && !isPremium ? "/premium" : resource.link} 
                          className="text-sm font-medium text-persian_pink-500 hover:text-persian_pink-600"
                        >
                          {resource.premium && !isPremium ? "Upgrade to view" : "View"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariant}
            className="space-y-8"
          >
            {/* Progress Chart */}
            <motion.div variants={itemVariant} className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-slate_blue-700 dark:text-slate_blue-400">Stress Level History</h2>
              
              {/* Simple chart visualization */}
              <div className="relative h-64 mt-8">
                <div className="absolute inset-0 flex items-end justify-between">
                  {mockAssessmentHistory.map((assessment, index) => {
                    const heightPercentage = (assessment.score / 40) * 100;
                    let barColor;
                    if (assessment.score <= 13) {
                      barColor = 'bg-slate_blue-400';
                    } else if (assessment.score <= 26) {
                      barColor = 'bg-amethyst-400';
                    } else {
                      barColor = 'bg-persian_pink-400';
                    }
                    
                    return (
                      <motion.div 
                        key={assessment.date}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="w-12 relative">
                          <motion.div 
                            className={`w-full ${barColor} rounded-t-md`}
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercentage}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                          ></motion.div>
                          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                            <span className="text-xs font-medium text-slate_blue-700 dark:text-slate_blue-400 -mb-6">
                              {assessment.score}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs mt-8 text-slate_blue-500 transform -rotate-45 origin-top-left">
                          {new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate_blue-100">
                <div className="flex justify-center space-x-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-slate_blue-400 rounded-full mr-2"></div>
                    <span className="text-xs text-slate_blue-500">Low Stress (0-13)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amethyst-400 rounded-full mr-2"></div>
                    <span className="text-xs text-slate_blue-500">Moderate Stress (14-26)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-persian_pink-400 rounded-full mr-2"></div>
                    <span className="text-xs text-slate_blue-500">High Stress (27-40)</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Assessment History */}
            <motion.div variants={itemVariant} className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-slate_blue-700 dark:text-slate_blue-400">Assessment History</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate_blue-100">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate_blue-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate_blue-500 uppercase tracking-wider">Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate_blue-500 uppercase tracking-wider">Stress Level</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate_blue-500 uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate_blue-100">
                    {mockAssessmentHistory.map((assessment, index) => {
                      const prevScore = index < mockAssessmentHistory.length - 1 
                        ? mockAssessmentHistory[index + 1].score 
                        : assessment.score;
                        
                      const change = prevScore - assessment.score;
                      
                      return (
                        <tr key={assessment.date}>
                          <td className="px-4 py-3 text-sm text-slate_blue-700 dark:text-slate_blue-400">
                            {new Date(assessment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate_blue-700 dark:text-slate_blue-400">
                            {assessment.score}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span 
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                assessment.score <= 13 
                                  ? 'bg-slate_blue-100 text-slate_blue-700' 
                                  : assessment.score <= 26 
                                    ? 'bg-amethyst-100 text-amethyst-700' 
                                    : 'bg-persian_pink-100 text-persian_pink-700'
                              }`}
                            >
                              {assessment.level}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {index < mockAssessmentHistory.length - 1 && (
                              <span 
                                className={`flex items-center ${
                                  change > 0 
                                    ? 'text-green-600' 
                                    : change < 0 
                                      ? 'text-red-600' 
                                      : 'text-slate_blue-500'
                                }`}
                              >
                                {change > 0 ? (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    {change} pts
                                  </>
                                ) : change < 0 ? (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    {Math.abs(change)} pts
                                  </>
                                ) : 'No change'}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariant}
            className="space-y-8"
          >
            <motion.div variants={itemVariant} className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-slate_blue-700 dark:text-slate_blue-400">All Activity</h2>
              
              <div className="space-y-6">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-6 last:pb-0 last:border-none border-b border-slate_blue-100">
                    <div className="flex-shrink-0 mr-4">
                      {activityIcons[activity.type as keyof typeof activityIcons]}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-slate_blue-700 dark:text-slate_blue-400">{activity.title}</p>
                      <p className="text-sm text-slate_blue-500">{activity.description}</p>
                      <p className="text-xs text-slate_blue-400 mt-1">
                        {new Date(activity.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <button className="text-xs text-slate_blue-500 hover:text-slate_blue-700">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {mockRecentActivity.length === 0 && (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate_blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-4 text-slate_blue-500 font-medium">No activity yet</p>
                  <p className="text-slate_blue-400 text-sm mt-1">Complete assessments and explore resources to see your activity here.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariant}
          >
            <motion.div variants={itemVariant} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-slate_blue-700 dark:text-slate_blue-400">Personalized Recommendations</h2>
              <p className="text-slate_blue-500 mb-6">
                Based on your assessment results and activity, here are some resources that may help you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRecommendations.map((resource) => (
                  <div key={resource.id} className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-md overflow-hidden">
                    <div className="h-4 bg-gradient-to-r from-slate_blue-400 to-persian_pink-400"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-slate_blue-700 dark:text-slate_blue-400">{resource.title}</h3>
                        {resource.premium && !isPremium && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-persian_pink-100 text-persian_pink-500">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate_blue-500 mb-4">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase font-medium text-slate_blue-400">
                          {resource.type}
                        </span>
                        <Link 
                          href={resource.premium && !isPremium ? "/premium" : resource.link} 
                          className="text-sm font-medium text-persian_pink-500 hover:text-persian_pink-600"
                        >
                          {resource.premium && !isPremium ? "Upgrade to view" : "View"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href="/resources" 
                  className="inline-flex items-center text-persian_pink-500 hover:text-persian_pink-600 font-medium"
                >
                  Browse all resources
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {!isPremium && (
              <motion.div 
                variants={itemVariant}
                className="bg-gradient-to-r from-slate_blue-400 to-persian_pink-400 rounded-xl shadow-lg overflow-hidden text-white"
              >
                <div className="p-8 relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mt-20 -mr-20"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Unlock Premium Features</h3>
                    <p className="mb-6">
                      Get access to advanced analytics, personalized resources, and professional support.
                    </p>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href="/premium" 
                        className="inline-block bg-white text-persian_pink-500 hover:bg-slate_blue-50 py-2 px-6 rounded-full font-medium shadow transition-colors duration-300"
                      >
                        Upgrade Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate_blue-200 py-6 mt-12">
        <div className="container-custom text-center">
          <p className="text-sm text-slate_blue-500">
            &copy; {new Date().getFullYear()} Thrive Tribe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
