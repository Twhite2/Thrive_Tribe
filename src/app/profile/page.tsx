"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { FaCamera, FaEdit, FaTrophy, FaStar } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const { session, isPremium } = useAuth();
  const isLoggedIn = !!session?.user;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User editable states
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("Tell us about yourself...");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Profile completeness calculation
  const [completeness, setCompleteness] = useState(0);
  
  // Sample assessment history data
  const [assessmentHistory, setAssessmentHistory] = useState([
    { date: "2025-09-05", score: 18, level: "Moderate Stress" },
    { date: "2025-08-22", score: 24, level: "Moderate Stress" },
    { date: "2025-08-08", score: 28, level: "High Stress" },
  ]);
  
  // Sample activity data
  const [activities, setActivities] = useState([
    { type: "assessment", name: "Completed Stress Assessment", date: "2025-09-05" },
    { type: "meditation", name: "Completed 10-min Meditation", date: "2025-09-04" },
    { type: "exercise", name: "Viewed Breathing Exercises", date: "2025-09-03" },
  ]);
  
  // User streak data
  const [currentStreak, setCurrentStreak] = useState(5);
  const [longestStreak, setLongestStreak] = useState(12);

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Initialize user data from session
    if (session?.user) {
      setName(session.user.name || "");
      setProfileImage(session.user.image || null);
    }

    // Calculate profile completeness
    calculateCompleteness();
  }, [isLoggedIn, router, session]);

  const calculateCompleteness = () => {
    let complete = 0;
    let total = 4; // Total number of profile fields (name, email, image, bio)
    
    if (session?.user?.name) complete++;
    if (session?.user?.email) complete++;
    if (session?.user?.image) complete++;
    if (bio && bio !== "Tell us about yourself...") complete++;
    
    setCompleteness(Math.floor((complete / total) * 100));
  };

  const handleSaveProfile = () => {
    // In a real app, save to database
    setIsEditing(false);
    calculateCompleteness();
    
    // Show success message or toast notification
    alert("Profile saved successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real app, upload to server and get URL
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // If not logged in, useEffect will handle redirection
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex items-center justify-center">
        <div className="text-center">Checking authentication status...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
      <Header />
      
      <div className="container-custom max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - User Info & Profile Actions */}
          <div className="w-full md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-6"
            >
              {/* Profile Header with Image */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-slate_blue-100 dark:bg-slate_blue-300">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-slate_blue-400">
                        {name ? name[0].toUpperCase() : "U"}
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <button 
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 bg-persian_pink-500 hover:bg-persian_pink-600 text-white p-2 rounded-full shadow-md transition-colors"
                    >
                      <FaCamera />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </button>
                  )}
                </div>

                {/* User Name */}
                <div className="text-center mb-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-xl font-bold text-center bg-slate_blue-50 dark:bg-slate_blue-300/20 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-md p-2 w-full"
                      placeholder="Your Name"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-slate_blue-700 dark:text-slate_blue-100">
                      {name || "User"}
                    </h1>
                  )}
                  <p className="text-slate_blue-500 dark:text-slate_blue-300 text-sm">
                    {session?.user?.email}
                  </p>
                  <p className="text-xs text-slate_blue-400 dark:text-slate_blue-400 mt-1">
                    Member since September 2025
                  </p>
                </div>

                {/* Bio */}
                <div className="w-full mb-6">
                  <h2 className="text-sm font-medium text-slate_blue-600 dark:text-slate_blue-200 mb-2">
                    About Me
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full h-24 bg-slate_blue-50 dark:bg-slate_blue-300/20 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-md p-3 text-sm"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-sm text-slate_blue-600 dark:text-slate_blue-300 bg-slate_blue-50 dark:bg-slate_blue-300/10 p-3 rounded-md">
                      {bio}
                    </p>
                  )}
                </div>

                {/* Edit/Save Button */}
                <div className="w-full">
                  {isEditing ? (
                    <button
                      onClick={handleSaveProfile}
                      className="w-full py-2 px-4 bg-persian_pink-500 hover:bg-persian_pink-600 text-white rounded-md transition-colors font-medium"
                    >
                      Save Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full py-2 px-4 bg-slate_blue-100 dark:bg-slate_blue-300/20 hover:bg-slate_blue-200 dark:hover:bg-slate_blue-300/30 text-slate_blue-700 dark:text-slate_blue-200 rounded-md transition-colors flex items-center justify-center font-medium"
                    >
                      <FaEdit className="mr-2" /> Edit Profile
                    </button>
                  )}
                </div>
                
                {/* Profile Completeness */}
                <div className="w-full mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate_blue-600 dark:text-slate_blue-200">
                      Profile Completeness
                    </span>
                    <span className="text-sm font-medium text-persian_pink-500">
                      {completeness}%
                    </span>
                  </div>
                  <div className="w-full bg-slate_blue-100 dark:bg-slate_blue-300/20 rounded-full h-2.5">
                    <div
                      className="bg-persian_pink-500 h-2.5 rounded-full"
                      style={{ width: `${completeness}%` }}
                    ></div>
                  </div>
                  
                  {completeness < 100 && (
                    <div className="mt-2 text-xs text-slate_blue-500 dark:text-slate_blue-300">
                      Complete your profile to get personalized recommendations
                    </div>
                  )}
                </div>

                {/* Premium Status */}
                <div className="w-full mt-6 bg-slate_blue-50 dark:bg-slate_blue-300/10 p-4 rounded-lg border border-slate_blue-100 dark:border-slate_blue-300/20">
                  <div className="flex items-start">
                    {isPremium ? (
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full text-white">
                        <FaStar className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 p-2 bg-slate_blue-200 dark:bg-slate_blue-400/30 rounded-full text-slate_blue-500 dark:text-slate_blue-300">
                        <FaStar className="h-5 w-5" />
                      </div>
                    )}
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-slate_blue-700 dark:text-slate_blue-100">
                        {isPremium ? "Premium Member" : "Free Account"}
                      </h3>
                      <p className="mt-1 text-xs text-slate_blue-500 dark:text-slate_blue-300">
                        {isPremium 
                          ? "Your premium membership expires on October 10, 2025" 
                          : "Upgrade to premium for full access to all features"}
                      </p>
                      
                      {!isPremium && (
                        <Link href="/premium" className="mt-2 inline-block text-xs font-medium text-persian_pink-500 hover:text-persian_pink-600">
                          Upgrade Now →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Right Column - Assessment History, Activities, Stats */}
          <div className="w-full md:w-2/3">
            {/* Assessment History */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate_blue-700 dark:text-slate_blue-100">
                  Assessment History
                </h2>
                <Link 
                  href="/assessment" 
                  className="text-sm font-medium text-persian_pink-500 hover:text-persian_pink-600"
                >
                  Retake Assessment
                </Link>
              </div>
              
              {/* Assessment Graph Placeholder */}
              <div className="w-full h-40 bg-slate_blue-50 dark:bg-slate_blue-300/10 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-sm text-slate_blue-400 dark:text-slate_blue-300">
                    Stress Level Trends Graph
                  </div>
                </div>
                
                {/* Simplified Graph Visualization */}
                <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 360 160" preserveAspectRatio="none">
                  <path 
                    d="M0,120 C60,100 120,140 180,80 C240,20 300,60 360,40" 
                    stroke="rgba(176, 83, 205, 0.6)" 
                    strokeWidth="3" 
                    fill="rgba(176, 83, 205, 0.1)"
                  />
                </svg>
              </div>
              
              {/* Recent Assessments */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate_blue-600 dark:text-slate_blue-200">
                  Recent Assessments
                </h3>
                {assessmentHistory.map((assessment, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between py-2 border-b border-slate_blue-100 dark:border-slate_blue-300/20 last:border-0"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate_blue-700 dark:text-slate_blue-100">
                        {assessment.level}
                      </div>
                      <div className="text-xs text-slate_blue-500 dark:text-slate_blue-300">
                        {new Date(assessment.date).toLocaleDateString("en-US", { 
                          year: "numeric", 
                          month: "short", 
                          day: "numeric" 
                        })}
                      </div>
                    </div>
                    <div className="bg-slate_blue-100 dark:bg-slate_blue-300/20 py-1 px-3 rounded-full">
                      <span className="text-sm font-medium text-slate_blue-700 dark:text-slate_blue-200">
                        {assessment.score}/40
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Activity & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Activity Feed */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-slate_blue-700 dark:text-slate_blue-100 mb-4">
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 mr-3">
                        {activity.type === "assessment" ? (
                          <div className="w-full h-full rounded-full bg-amethyst-100 dark:bg-amethyst-300/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-amethyst-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : activity.type === "meditation" ? (
                          <div className="w-full h-full rounded-full bg-slate_blue-100 dark:bg-slate_blue-300/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-slate_blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-full h-full rounded-full bg-persian_pink-100 dark:bg-persian_pink-300/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-persian_pink-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate_blue-700 dark:text-slate_blue-100">
                          {activity.name}
                        </div>
                        <div className="text-xs text-slate_blue-500 dark:text-slate_blue-300">
                          {new Date(activity.date).toLocaleDateString("en-US", { 
                            year: "numeric", 
                            month: "short", 
                            day: "numeric" 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href="/dashboard" 
                  className="block mt-4 text-sm font-medium text-persian_pink-500 hover:text-persian_pink-600 text-center"
                >
                  View All Activities
                </Link>
              </motion.div>
              
              {/* Stats & Achievements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-slate_blue-700 dark:text-slate_blue-100 mb-4">
                  Stats & Achievements
                </h2>
                
                {/* Streaks */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate_blue-600 dark:text-slate_blue-200 mb-3">
                    Your Streaks
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate_blue-50 dark:bg-slate_blue-300/10 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-persian_pink-500">{currentStreak}</div>
                      <div className="text-xs text-slate_blue-500 dark:text-slate_blue-300">Current Streak</div>
                    </div>
                    <div className="bg-slate_blue-50 dark:bg-slate_blue-300/10 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-persian_pink-500">{longestStreak}</div>
                      <div className="text-xs text-slate_blue-500 dark:text-slate_blue-300">Longest Streak</div>
                    </div>
                  </div>
                </div>
                
                {/* Achievements */}
                <div>
                  <h3 className="text-sm font-medium text-slate_blue-600 dark:text-slate_blue-200 mb-3">
                    Recent Achievements
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-300/20 flex items-center justify-center mb-1">
                        <FaTrophy className="text-amber-500 text-lg" />
                      </div>
                      <div className="text-xs text-slate_blue-600 dark:text-slate_blue-300 text-center">First Assessment</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate_blue-100 dark:bg-slate_blue-300/20 flex items-center justify-center mb-1">
                        <svg className="w-6 h-6 text-slate_blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                        </svg>
                      </div>
                      <div className="text-xs text-slate_blue-600 dark:text-slate_blue-300 text-center">Zen Master</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-persian_pink-100 dark:bg-persian_pink-300/20 flex items-center justify-center mb-1">
                        <svg className="w-6 h-6 text-persian_pink-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-xs text-slate_blue-600 dark:text-slate_blue-300 text-center">Self Care</div>
                    </div>
                  </div>
                  
                  <Link 
                    href="/achievements" 
                    className="block mt-4 text-sm font-medium text-persian_pink-500 hover:text-persian_pink-600 text-center"
                  >
                    View All Achievements
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
