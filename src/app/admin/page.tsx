"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaUsers, 
  FaUserPlus, 
  FaChartLine, 
  FaFileAlt, 
  FaCalendarCheck,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaEllipsisH
} from "react-icons/fa";

// Mock data for dashboard statistics
const stats = [
  { 
    name: "Total Users", 
    value: "2,854", 
    change: "+12%", 
    isIncrease: true,
    icon: FaUsers,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
  },
  { 
    name: "New Sign-ups", 
    value: "243", 
    change: "+28%", 
    isIncrease: true, 
    icon: FaUserPlus,
    color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
  },
  { 
    name: "Assessments", 
    value: "1,432", 
    change: "+8%", 
    isIncrease: true, 
    icon: FaFileAlt,
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
  },
  { 
    name: "Premium Subscriptions", 
    value: "486", 
    change: "+18%", 
    isIncrease: true, 
    icon: FaMoneyBillWave,
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
  },
];

// Mock data for recent users
const recentUsers = [
  { id: 1, name: "Emma Thompson", email: "emma.t@example.com", date: "2025-09-04", status: "active" },
  { id: 2, name: "Michael Chen", email: "michael.c@example.com", date: "2025-09-04", status: "active" },
  { id: 3, name: "Sarah Johnson", email: "sarah.j@example.com", date: "2025-09-03", status: "pending" },
  { id: 4, name: "David Rodriguez", email: "david.r@example.com", date: "2025-09-03", status: "active" },
  { id: 5, name: "Priya Patel", email: "priya.p@example.com", date: "2025-09-02", status: "active" },
];

// Mock data for recent activity
const recentActivity = [
  { 
    id: 1, 
    user: "Emma Thompson", 
    action: "completed an assessment", 
    score: 12,
    stressLevel: "Low Stress",
    time: "2 hours ago"
  },
  { 
    id: 2, 
    user: "Michael Chen", 
    action: "subscribed to premium", 
    plan: "Annual",
    time: "4 hours ago"
  },
  { 
    id: 3, 
    user: "David Rodriguez", 
    action: "completed an assessment", 
    score: 28,
    stressLevel: "High Stress",
    time: "6 hours ago"
  },
  { 
    id: 4, 
    user: "Priya Patel", 
    action: "viewed 5 premium articles", 
    time: "1 day ago"
  },
];

// Mock data for alerts
const alerts = [
  { 
    id: 1, 
    type: "warning", 
    message: "High stress score detected for David Rodriguez - Score: 28", 
    time: "6 hours ago" 
  },
  { 
    id: 2, 
    type: "info", 
    message: "Weekly email campaign scheduled for tomorrow", 
    time: "12 hours ago" 
  },
  { 
    id: 3, 
    type: "success", 
    message: "Monthly revenue goal achieved - $9,850", 
    time: "1 day ago" 
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "activity" | "alerts">("overview");

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Get an overview of your app's performance and user activity.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <Link
            href="/admin/reports"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Generate Report
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-neutral-800 overflow-hidden rounded-lg shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-neutral-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.isIncrease ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-neutral-300 focus:border-primary focus:ring-primary"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as any)}
          >
            <option value="overview">Overview</option>
            <option value="users">Recent Users</option>
            <option value="activity">User Activity</option>
            <option value="alerts">Alerts</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "bg-primary text-white"
                  : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`${
                activeTab === "users"
                  ? "bg-primary text-white"
                  : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              Recent Users
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`${
                activeTab === "activity"
                  ? "bg-primary text-white"
                  : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              User Activity
            </button>
            <button
              onClick={() => setActiveTab("alerts")}
              className={`${
                activeTab === "alerts"
                  ? "bg-primary text-white"
                  : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              Alerts
            </button>
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Chart Placeholder */}
            <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                User Growth
              </h3>
              <div className="h-64 bg-neutral-100 dark:bg-neutral-700 rounded-md flex items-center justify-center">
                <p className="text-neutral-500 dark:text-neutral-400">
                  Chart Placeholder: User Growth Over Time
                </p>
              </div>
            </div>

            {/* Second Chart */}
            <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                Assessment Distribution
              </h3>
              <div className="h-64 bg-neutral-100 dark:bg-neutral-700 rounded-md flex items-center justify-center">
                <p className="text-neutral-500 dark:text-neutral-400">
                  Chart Placeholder: Assessment Results Distribution
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-neutral-800 shadow rounded-lg">
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {recentActivity.slice(0, 3).map((activity) => (
                  <li key={activity.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium">
                          {activity.user.split(" ").map(word => word[0]).join("")}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                          {activity.user}
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {activity.action}
                          {activity.score !== undefined && (
                            <span className={`ml-1 ${
                              activity.score < 14 
                                ? "text-green-500" 
                                : activity.score < 27 
                                  ? "text-yellow-500" 
                                  : "text-red-500"
                            }`}>
                              ({activity.stressLevel})
                            </span>
                          )}
                          {activity.plan && <span className="ml-1">({activity.plan})</span>}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                        {activity.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
                <Link 
                  href="/admin/activity"
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  View all activity
                </Link>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white dark:bg-neutral-800 shadow rounded-lg">
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                  Alerts
                </h3>
              </div>
              <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {alerts.map((alert) => (
                  <li key={alert.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          alert.type === "warning" 
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" 
                            : alert.type === "info" 
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                              : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                          <FaExclamationTriangle className={alert.type === "warning" ? "block" : "hidden"} />
                          <FaCalendarCheck className={alert.type === "info" ? "block" : "hidden"} />
                          <FaChartLine className={alert.type === "success" ? "block" : "hidden"} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {alert.message}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                        {alert.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
                <Link 
                  href="/admin/alerts"
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  View all alerts
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recent Users */}
        {activeTab === "users" && (
          <div className="bg-white dark:bg-neutral-800 shadow rounded-lg">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                Recent Users
              </h3>
              <Link 
                href="/admin/users"
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                View all users
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                      Date Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium">
                            {user.name.split(" ").map(word => word[0]).join("")}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900 dark:text-white">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {user.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark">
                          <FaEllipsisH />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Activity */}
        {activeTab === "activity" && (
          <div className="bg-white dark:bg-neutral-800 shadow rounded-lg">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                User Activity
              </h3>
              <Link 
                href="/admin/activity"
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                View all activity
              </Link>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium">
                        {activity.user.split(" ").map(word => word[0]).join("")}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {activity.user}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {activity.action}
                        {activity.score !== undefined && (
                          <span className={`ml-1 ${
                            activity.score < 14 
                              ? "text-green-500" 
                              : activity.score < 27 
                                ? "text-yellow-500" 
                                : "text-red-500"
                          }`}>
                            ({activity.stressLevel})
                          </span>
                        )}
                        {activity.plan && <span className="ml-1">({activity.plan})</span>}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts */}
        {activeTab === "alerts" && (
          <div className="bg-white dark:bg-neutral-800 shadow rounded-lg">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                System Alerts
              </h3>
              <Link 
                href="/admin/alerts/settings"
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                Alert Settings
              </Link>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        alert.type === "warning" 
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" 
                          : alert.type === "info" 
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                            : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      }`}>
                        <FaExclamationTriangle className={alert.type === "warning" ? "block" : "hidden"} />
                        <FaCalendarCheck className={alert.type === "info" ? "block" : "hidden"} />
                        <FaChartLine className={alert.type === "success" ? "block" : "hidden"} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {alert.message}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                      {alert.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
