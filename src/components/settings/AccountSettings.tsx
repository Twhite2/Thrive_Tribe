"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FaSave, FaTrash } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function AccountSettings() {
  const router = useRouter();
  const { session } = useAuth();
  
  // Form states
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      // In a real app, you would call your API to update the profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setMessage({
        text: "Profile updated successfully",
        type: "success"
      });
    } catch (error) {
      setMessage({
        text: "Failed to update profile",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    // Validate passwords
    if (newPassword !== confirmNewPassword) {
      setMessage({
        text: "New passwords do not match",
        type: "error"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, you would call your API to change the password
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      
      setMessage({
        text: "Password changed successfully",
        type: "success"
      });
    } catch (error) {
      setMessage({
        text: "Failed to change password",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });
    
    try {
      // Call the API endpoint to delete the account
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete account');
      }
      
      // Sign out the user after account deletion
      await signOut({ redirect: false });
      
      // Set a success message
      setMessage({
        text: "Your account has been deleted successfully.",
        type: "success"
      });
      
      // Brief delay to allow the message to be seen
      setTimeout(() => {
        // Redirect to the home page
        router.push("/");
      }, 1500);
    } catch (error: any) {
      setMessage({
        text: error.message || "Failed to delete account. Please try again.",
        type: "error"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <section>
        <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
          Profile Information
        </h3>
        
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate_blue-600 dark:text-slate_blue-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-lg bg-white dark:bg-slate_blue-300/20 text-slate_blue-700 dark:text-slate_blue-100"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate_blue-600 dark:text-slate_blue-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-lg bg-white dark:bg-slate_blue-300/20 text-slate_blue-700 dark:text-slate_blue-100"
              placeholder="Your email"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-persian_pink-500 hover:bg-persian_pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-persian_pink-500 disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </section>
      
      {/* Change Password */}
      <section>
        <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
          Change Password
        </h3>
        
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-slate_blue-600 dark:text-slate_blue-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-lg bg-white dark:bg-slate_blue-300/20 text-slate_blue-700 dark:text-slate_blue-100"
              placeholder="Current password"
              required
            />
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-slate_blue-600 dark:text-slate_blue-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-lg bg-white dark:bg-slate_blue-300/20 text-slate_blue-700 dark:text-slate_blue-100"
              placeholder="New password"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-slate_blue-600 dark:text-slate_blue-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full p-3 border border-slate_blue-200 dark:border-slate_blue-400/30 rounded-lg bg-white dark:bg-slate_blue-300/20 text-slate_blue-700 dark:text-slate_blue-100"
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate_blue-500 hover:bg-slate_blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate_blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </section>
      
      {/* Delete Account */}
      <section className="border-t border-slate_blue-200 dark:border-slate_blue-400/20 pt-6">
        <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
          Delete Account
        </h3>
        
        <p className="mb-4 text-sm text-slate_blue-600 dark:text-slate_blue-300">
          Once you delete your account, there is no going back. This action cannot be undone.
        </p>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaTrash className="mr-2" />
            Delete Account
          </button>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-900/30">
            <p className="mb-3 text-sm text-red-800 dark:text-red-200">
              Are you sure you want to delete your account? All your data will be permanently removed. This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAccount}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isSubmitting ? "Deleting..." : "Yes, Delete My Account"}
              </button>
              
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate_blue-400/30 rounded-md shadow-sm text-sm font-medium text-slate_blue-700 dark:text-slate_blue-200 bg-white dark:bg-slate_blue-300/20 hover:bg-gray-50 dark:hover:bg-slate_blue-300/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-persian_pink-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
      
      {/* Status Message */}
      {message.text && (
        <div
          className={`p-4 rounded-md ${
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
