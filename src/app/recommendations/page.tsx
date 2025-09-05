"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegBookmark, FaBookmark, FaPlay, FaFileAlt, FaHeadphones } from "react-icons/fa";

// Mock content database - in a real app, this would come from a CMS or API
const contentDatabase = {
  lowStress: [
    {
      id: "1",
      title: "Maintaining Your Mental Wellbeing",
      type: "article",
      duration: "5 min read",
      image: "/images/article1.jpg",
      description: "Learn strategies to maintain your positive mental health and prevent stress buildup.",
      isPremium: false,
    },
    {
      id: "2",
      title: "Morning Meditation for Beginners",
      type: "video",
      duration: "8 min",
      image: "/images/video1.jpg",
      description: "Start your day with this calming meditation practice to maintain mental clarity.",
      isPremium: false,
    },
    {
      id: "3",
      title: "Building Resilience Toolkit",
      type: "toolkit",
      duration: "PDF Guide",
      image: "/images/toolkit1.jpg",
      description: "Downloadable resources to help you build and maintain emotional resilience.",
      isPremium: false,
    },
    {
      id: "4",
      title: "Advanced Mindfulness Techniques",
      type: "course",
      duration: "4 sessions",
      image: "/images/course1.jpg",
      description: "Take your mindfulness practice to the next level with these advanced techniques.",
      isPremium: true,
    },
  ],
  moderateStress: [
    {
      id: "5",
      title: "Managing Everyday Stress",
      type: "article",
      duration: "7 min read",
      image: "/images/article2.jpg",
      description: "Practical strategies to help you manage and reduce your daily stress levels.",
      isPremium: false,
    },
    {
      id: "6",
      title: "Breathing Exercises for Stress Relief",
      type: "video",
      duration: "12 min",
      image: "/images/video2.jpg",
      description: "Simple breathing techniques you can use anywhere to quickly reduce stress.",
      isPremium: false,
    },
    {
      id: "7",
      title: "Self-Care Planning Guide",
      type: "toolkit",
      duration: "PDF Guide",
      image: "/images/toolkit2.jpg",
      description: "Create your personalized self-care plan with this interactive guide.",
      isPremium: false,
    },
    {
      id: "8",
      title: "Stress Management Workshop",
      type: "course",
      duration: "6 sessions",
      image: "/images/course2.jpg",
      description: "A comprehensive workshop on understanding and managing stress effectively.",
      isPremium: true,
    },
  ],
  highStress: [
    {
      id: "9",
      title: "Recognizing Burnout and Taking Action",
      type: "article",
      duration: "8 min read",
      image: "/images/article3.jpg",
      description: "Learn to identify signs of burnout and steps to take for immediate relief.",
      isPremium: false,
    },
    {
      id: "10",
      title: "Emergency Stress Relief Meditation",
      type: "video",
      duration: "15 min",
      image: "/images/video3.jpg",
      description: "A guided meditation specifically designed for moments of high stress.",
      isPremium: false,
    },
    {
      id: "11",
      title: "Crisis Support Resources",
      type: "toolkit",
      duration: "PDF Guide",
      image: "/images/toolkit3.jpg",
      description: "A collection of resources for immediate support during difficult times.",
      isPremium: false,
    },
    {
      id: "12",
      title: "Intensive Stress Reduction Program",
      type: "course",
      duration: "8 sessions",
      image: "/images/course3.jpg",
      description: "A structured program to help you significantly reduce high stress levels.",
      isPremium: true,
    },
  ],
};

// Content card component
const ContentCard = ({ 
  item, 
  savedItems, 
  toggleSaved 
}: { 
  item: any, 
  savedItems: string[], 
  toggleSaved: (id: string) => void 
}) => {
  const isSaved = savedItems.includes(item.id);

  // Function to get icon based on content type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <FaPlay className="text-primary" />;
      case 'article':
        return <FaFileAlt className="text-secondary" />;
      case 'toolkit':
        return <FaFileAlt className="text-accent" />;
      case 'audio':
        return <FaHeadphones className="text-primary-dark" />;
      default:
        return <FaFileAlt className="text-primary" />;
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-neutral-200 dark:bg-neutral-700">
        {/* Placeholder for image - in a real app, use actual images */}
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={() => toggleSaved(item.id)}
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-full shadow-md"
          >
            {isSaved ? <FaBookmark className="text-primary" /> : <FaRegBookmark />}
          </button>
        </div>

        {item.isPremium && (
          <div className="absolute top-0 left-0 bg-accent text-white px-2 py-1 text-xs font-medium">
            PREMIUM
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
          <span className="flex items-center gap-1">
            {getTypeIcon(item.type)}
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
          <span>•</span>
          <span>{item.duration}</span>
        </div>

        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <Link
          href={item.isPremium ? "/premium" : `/content/${item.id}`}
          className={`block text-center py-2 px-4 rounded-md ${
            item.isPremium
              ? "bg-accent text-white"
              : "bg-primary text-white"
          }`}
        >
          {item.isPremium ? "Upgrade to Access" : "View Content"}
        </Link>
      </div>
    </div>
  );
};

export default function Recommendations() {
  const [assessmentScore, setAssessmentScore] = useState<number>(0);
  const [stressLevel, setStressLevel] = useState<"lowStress" | "moderateStress" | "highStress">("lowStress");
  const [recommendedContent, setRecommendedContent] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    // In a real app, this would fetch from an API or database
    const score = parseInt(localStorage.getItem("assessment_score") || "0");
    setAssessmentScore(score);

    // Determine stress level based on score
    let level: "lowStress" | "moderateStress" | "highStress";
    if (score <= 13) {
      level = "lowStress";
    } else if (score <= 26) {
      level = "moderateStress";
    } else {
      level = "highStress";
    }
    setStressLevel(level);

    // Set recommended content based on stress level
    setRecommendedContent(contentDatabase[level]);
  }, []);

  // Toggle save/unsave content
  const toggleSaved = (id: string) => {
    setSavedItems((prevSaved) =>
      prevSaved.includes(id)
        ? prevSaved.filter((itemId) => itemId !== id)
        : [...prevSaved, id]
    );
  };

  // Filter content by type
  const filteredContent = selectedFilter === "all"
    ? recommendedContent
    : recommendedContent.filter(item => item.type === selectedFilter);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      <header className="py-4 px-6 bg-white dark:bg-neutral-800 shadow-sm">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} />
            <span className="text-lg font-bold text-primary">Thrive Tribe</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-neutral-600 hover:text-primary dark:text-neutral-300">
              Dashboard
            </Link>
            <Link href="/assessment" className="text-neutral-600 hover:text-primary dark:text-neutral-300">
              Assessment
            </Link>
            <Link 
              href="/recommendations" 
              className="text-primary border-b-2 border-primary font-medium"
            >
              Recommendations
            </Link>
            <Link href="/premium" className="text-neutral-600 hover:text-primary dark:text-neutral-300">
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

      <main className="flex-grow container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Personalized Recommendations</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Based on your assessment, we've curated content to help with 
            {stressLevel === "lowStress" && " maintaining your well-being"}
            {stressLevel === "moderateStress" && " managing moderate stress levels"}
            {stressLevel === "highStress" && " addressing higher levels of stress"}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Filter by:
          </div>
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedFilter === "all"
                ? "bg-primary text-white"
                : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter("video")}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedFilter === "video"
                ? "bg-primary text-white"
                : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setSelectedFilter("article")}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedFilter === "article"
                ? "bg-primary text-white"
                : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => setSelectedFilter("toolkit")}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedFilter === "toolkit"
                ? "bg-primary text-white"
                : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            Toolkits
          </button>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContent.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              savedItems={savedItems}
              toggleSaved={toggleSaved}
            />
          ))}
        </div>

        {/* Premium upsell */}
        <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Unlock All Premium Content</h2>
              <p className="text-white/80 max-w-xl">
                Get unlimited access to all our premium content, progress tracking, and personalized recommendations to accelerate your wellness journey.
              </p>
            </div>
            <Link 
              href="/premium" 
              className="px-6 py-3 bg-white text-primary font-medium rounded-md shadow-sm hover:bg-neutral-100 transition duration-200"
            >
              Upgrade to Premium
            </Link>
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
