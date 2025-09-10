"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaLock, 
  FaBell, 
  FaPalette, 
  FaShieldAlt, 
  FaCreditCard,
  FaGlobe,
  FaChevronRight
} from "react-icons/fa";

// Import settings components
import AccountSettings from "@/components/settings/AccountSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import NotificationSettings from "@/components/settings/NotificationSettings";

// Tab type
type SettingsTab = 
  | "account" 
  | "privacy" 
  | "notifications" 
  | "appearance" 
  | "security" 
  | "subscription" 
  | "app";

export default function SettingsPage() {
  const router = useRouter();
  const { session } = useAuth();
  const isLoggedIn = !!session?.user;
  
  // Active tab state
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  
  // Check authentication
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  // If not logged in, useEffect will handle redirection
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex items-center justify-center">
        <div className="text-center">Checking authentication status...</div>
      </div>
    );
  }

  // Navigation items
  const navItems = [
    { id: "account", label: "Account Settings", icon: <FaUser /> },
    { id: "privacy", label: "Privacy", icon: <FaLock /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "appearance", label: "Appearance", icon: <FaPalette /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
    { id: "subscription", label: "Subscription", icon: <FaCreditCard /> },
    { id: "app", label: "App Preferences", icon: <FaGlobe /> }
  ];

  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
      <Header />
      
      <div className="container-custom max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate_blue-700 dark:text-slate_blue-100 mb-6">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-64 bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-4"
          >
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as SettingsTab)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-persian_pink-50 dark:bg-persian_pink-500/20 text-persian_pink-600 dark:text-persian_pink-300"
                      : "text-slate_blue-600 dark:text-slate_blue-300 hover:bg-slate_blue-50 dark:hover:bg-slate_blue-300/10"
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <FaChevronRight className="ml-auto text-xs" />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>
          
          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow bg-white dark:bg-slate_blue-200 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-slate_blue-700 dark:text-slate_blue-100 mb-6">
              {navItems.find(item => item.id === activeTab)?.label}
            </h2>
            
            {/* Render appropriate settings component based on active tab */}
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "privacy" && <PrivacySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab !== "account" && activeTab !== "privacy" && activeTab !== "notifications" && (
              <p className="text-slate_blue-600 dark:text-slate_blue-300">
                This settings section will be available soon.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
