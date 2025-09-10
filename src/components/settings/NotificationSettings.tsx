"use client";

import { useState } from "react";
import { FaSave } from "react-icons/fa";

export default function NotificationSettings() {
  // Notification settings states
  const [emailNotifications, setEmailNotifications] = useState({
    weeklyDigest: true,
    newFeatures: true,
    reminders: true,
    tipOfTheDay: false,
    marketingEmails: false
  });
  
  const [pushNotifications, setPushNotifications] = useState({
    dailyReminders: true,
    sessionAlerts: true,
    achievementUnlocks: true,
    friendActivity: false
  });
  
  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: "22:00",
    endTime: "07:00"
  });
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      // In a real app, you would call your API to update notification settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setMessage({
        text: "Notification settings saved successfully",
        type: "success"
      });
    } catch (error) {
      setMessage({
        text: "Failed to save notification settings",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (key: string, checked: boolean) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handlePushChange = (key: string, checked: boolean) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleQuietHoursToggle = (checked: boolean) => {
    setQuietHours(prev => ({
      ...prev,
      enabled: checked
    }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSaveNotifications}>
        {/* Email Notifications */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
            Email Notifications
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="weeklyDigest" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Weekly Progress Digest
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Receive a weekly summary of your wellness journey
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="weeklyDigest"
                    checked={emailNotifications.weeklyDigest}
                    onChange={(e) => handleEmailChange("weeklyDigest", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b border-slate_blue-100 dark:border-slate_blue-300/20"></div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="newFeatures" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  New Features & Updates
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Get notified about new app features and improvements
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="newFeatures"
                    checked={emailNotifications.newFeatures}
                    onChange={(e) => handleEmailChange("newFeatures", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b border-slate_blue-100 dark:border-slate_blue-300/20"></div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="reminders" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Activity Reminders
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Receive reminders to practice wellness activities
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="reminders"
                    checked={emailNotifications.reminders}
                    onChange={(e) => handleEmailChange("reminders", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b border-slate_blue-100 dark:border-slate_blue-300/20"></div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="tipOfTheDay" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Daily Wellness Tips
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Get daily tips for improving mental wellness
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="tipOfTheDay"
                    checked={emailNotifications.tipOfTheDay}
                    onChange={(e) => handleEmailChange("tipOfTheDay", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b border-slate_blue-100 dark:border-slate_blue-300/20"></div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="marketingEmails" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Marketing Emails
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Receive offers, promotions, and other marketing communications
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="marketingEmails"
                    checked={emailNotifications.marketingEmails}
                    onChange={(e) => handleEmailChange("marketingEmails", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
          </div>
        </section>
        
        {/* Push Notifications */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
            Push Notifications
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="dailyReminders" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Daily Reminders
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Receive daily reminders for your wellness activities
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="dailyReminders"
                    checked={pushNotifications.dailyReminders}
                    onChange={(e) => handlePushChange("dailyReminders", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b border-slate_blue-100 dark:border-slate_blue-300/20"></div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="sessionAlerts" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Session Alerts
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Get alerts for upcoming meditation and wellness sessions
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="sessionAlerts"
                    checked={pushNotifications.sessionAlerts}
                    onChange={(e) => handlePushChange("sessionAlerts", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b border-slate_blue-100 dark:border-slate_blue-300/20"></div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="achievementUnlocks" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Achievement Unlocks
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Get notified when you unlock achievements
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="achievementUnlocks"
                    checked={pushNotifications.achievementUnlocks}
                    onChange={(e) => handlePushChange("achievementUnlocks", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b border-slate_blue-100 dark:border-slate_blue-300/20"></div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <label htmlFor="friendActivity" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Friend Activity
                </label>
                <p className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Get notified about your friends' activities and milestones
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="friendActivity"
                    checked={pushNotifications.friendActivity}
                    onChange={(e) => handlePushChange("friendActivity", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate_blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate_blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-persian_pink-500"></div>
                </label>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quiet Hours */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
            Quiet Hours
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="quietHoursEnabled"
                  name="quietHoursEnabled"
                  type="checkbox"
                  checked={quietHours.enabled}
                  onChange={(e) => handleQuietHoursToggle(e.target.checked)}
                  className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 rounded focus:ring-persian_pink-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="quietHoursEnabled" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                  Enable Quiet Hours
                </label>
                <p className="text-slate_blue-500 dark:text-slate_blue-400">
                  Pause all notifications during your specified quiet hours
                </p>
              </div>
            </div>
            
            {quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4 mt-4 pl-7">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-slate_blue-600 dark:text-slate_blue-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={quietHours.startTime}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full p-2 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-lg bg-white dark:bg-slate_blue-300/20 text-slate_blue-700 dark:text-slate_blue-100"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-slate_blue-600 dark:text-slate_blue-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={quietHours.endTime}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full p-2 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-lg bg-white dark:bg-slate_blue-300/20 text-slate_blue-700 dark:text-slate_blue-100"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Save Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-persian_pink-500 hover:bg-persian_pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-persian_pink-500 disabled:opacity-50"
          >
            <FaSave className="mr-2" />
            {isSubmitting ? "Saving..." : "Save Notification Settings"}
          </button>
        </div>
      </form>
      
      {/* Status Message */}
      {message.text && (
        <div
          className={`p-4 rounded-md mt-4 ${
            message.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
              : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
