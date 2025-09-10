"use client";

import { useState } from "react";
import { FaSave } from "react-icons/fa";

export default function PrivacySettings() {
  // Privacy settings states
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataSharing, setDataSharing] = useState({
    allowAnonymizedData: true,
    allowResearch: false,
    allowRecommendations: true,
    allowThirdParty: false
  });
  const [connectedApps, setConnectedApps] = useState([
    { id: 1, name: "Google Fit", connected: true, lastUsed: "2025-09-01" },
    { id: 2, name: "Apple Health", connected: false, lastUsed: "2025-08-15" },
    { id: 3, name: "Fitbit", connected: true, lastUsed: "2025-09-08" }
  ]);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSavePrivacySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      // In a real app, you would call your API to update privacy settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setMessage({
        text: "Privacy settings updated successfully",
        type: "success"
      });
    } catch (error) {
      setMessage({
        text: "Failed to update privacy settings",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAppConnection = async (appId: number) => {
    const updatedApps = connectedApps.map(app => {
      if (app.id === appId) {
        return { ...app, connected: !app.connected };
      }
      return app;
    });
    
    setConnectedApps(updatedApps);
    
    // In a real app, you would make an API call to update the connection status
  };

  const handleDataSharingChange = (key: string, checked: boolean) => {
    setDataSharing(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Visibility */}
      <section>
        <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
          Profile Visibility
        </h3>
        
        <form onSubmit={handleSavePrivacySettings} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="public"
                name="profileVisibility"
                value="public"
                checked={profileVisibility === "public"}
                onChange={() => setProfileVisibility("public")}
                className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 focus:ring-persian_pink-500"
              />
              <label htmlFor="public" className="ml-3">
                <div className="text-sm font-medium text-slate_blue-700 dark:text-slate_blue-200">Public</div>
                <div className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Your profile and progress are visible to everyone
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="friends"
                name="profileVisibility"
                value="friends"
                checked={profileVisibility === "friends"}
                onChange={() => setProfileVisibility("friends")}
                className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 focus:ring-persian_pink-500"
              />
              <label htmlFor="friends" className="ml-3">
                <div className="text-sm font-medium text-slate_blue-700 dark:text-slate_blue-200">Friends Only</div>
                <div className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Only people you've connected with can see your profile
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="private"
                name="profileVisibility"
                value="private"
                checked={profileVisibility === "private"}
                onChange={() => setProfileVisibility("private")}
                className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 focus:ring-persian_pink-500"
              />
              <label htmlFor="private" className="ml-3">
                <div className="text-sm font-medium text-slate_blue-700 dark:text-slate_blue-200">Private</div>
                <div className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
                  Your profile is only visible to you
                </div>
              </label>
            </div>
          </div>
          
          {/* Data Sharing Section */}
          <div>
            <h4 className="text-md font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-3">
              Data Sharing
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="allowAnonymizedData"
                    name="allowAnonymizedData"
                    type="checkbox"
                    checked={dataSharing.allowAnonymizedData}
                    onChange={(e) => handleDataSharingChange("allowAnonymizedData", e.target.checked)}
                    className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 rounded focus:ring-persian_pink-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="allowAnonymizedData" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                    Share anonymized data
                  </label>
                  <p className="text-slate_blue-500 dark:text-slate_blue-400">
                    Allow us to use your anonymized data to improve our services
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="allowResearch"
                    name="allowResearch"
                    type="checkbox"
                    checked={dataSharing.allowResearch}
                    onChange={(e) => handleDataSharingChange("allowResearch", e.target.checked)}
                    className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 rounded focus:ring-persian_pink-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="allowResearch" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                    Contribute to research
                  </label>
                  <p className="text-slate_blue-500 dark:text-slate_blue-400">
                    Allow your anonymized data to be used for mental health research
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="allowRecommendations"
                    name="allowRecommendations"
                    type="checkbox"
                    checked={dataSharing.allowRecommendations}
                    onChange={(e) => handleDataSharingChange("allowRecommendations", e.target.checked)}
                    className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 rounded focus:ring-persian_pink-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="allowRecommendations" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                    Personalized recommendations
                  </label>
                  <p className="text-slate_blue-500 dark:text-slate_blue-400">
                    Allow us to analyze your activity to provide personalized recommendations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="allowThirdParty"
                    name="allowThirdParty"
                    type="checkbox"
                    checked={dataSharing.allowThirdParty}
                    onChange={(e) => handleDataSharingChange("allowThirdParty", e.target.checked)}
                    className="h-4 w-4 text-persian_pink-500 border-slate_blue-300 rounded focus:ring-persian_pink-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="allowThirdParty" className="font-medium text-slate_blue-700 dark:text-slate_blue-200">
                    Third-party sharing
                  </label>
                  <p className="text-slate_blue-500 dark:text-slate_blue-400">
                    Allow us to share your data with trusted third-party partners
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-persian_pink-500 hover:bg-persian_pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-persian_pink-500 disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {isSubmitting ? "Saving..." : "Save Privacy Settings"}
            </button>
          </div>
        </form>
      </section>
      
      {/* Connected Apps Section */}
      <section className="border-t border-slate_blue-200 dark:border-slate_blue-400/20 pt-6">
        <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
          Connected Applications
        </h3>
        
        <div className="space-y-4">
          {connectedApps.map((app) => (
            <div key={app.id} className="flex items-center justify-between py-3 px-4 bg-slate_blue-50 dark:bg-slate_blue-300/10 rounded-lg">
              <div>
                <p className="font-medium text-slate_blue-700 dark:text-slate_blue-200">{app.name}</p>
                <p className="text-xs text-slate_blue-500 dark:text-slate_blue-400">
                  Last used: {new Date(app.lastUsed).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <button
                  onClick={() => toggleAppConnection(app.id)}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    app.connected
                      ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                      : "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                  }`}
                >
                  {app.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Data Export Section */}
      <section className="border-t border-slate_blue-200 dark:border-slate_blue-400/20 pt-6">
        <h3 className="text-lg font-medium text-slate_blue-700 dark:text-slate_blue-100 mb-4">
          Your Data
        </h3>
        
        <div className="space-y-4">
          <button
            className="inline-flex items-center px-4 py-2 border border-slate_blue-300 dark:border-slate_blue-400/30 rounded-md shadow-sm text-sm font-medium text-slate_blue-700 dark:text-slate_blue-200 bg-white dark:bg-slate_blue-300/20 hover:bg-slate_blue-50 dark:hover:bg-slate_blue-300/30"
          >
            Download Your Data
          </button>
          
          <div className="text-sm text-slate_blue-500 dark:text-slate_blue-400">
            Download a copy of your personal data in a machine-readable format.
          </div>
        </div>
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
