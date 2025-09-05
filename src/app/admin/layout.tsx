"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  FaHome, 
  FaUsers, 
  FaBook, 
  FaChartBar, 
  FaEnvelope, 
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: FaHome },
    { name: "Users", href: "/admin/users", icon: FaUsers },
    { name: "Content", href: "/admin/content", icon: FaBook },
    { name: "Analytics", href: "/admin/analytics", icon: FaChartBar },
    { name: "Email Campaigns", href: "/admin/emails", icon: FaEnvelope },
    { name: "Settings", href: "/admin/settings", icon: FaCog },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transition duration-300 transform bg-white dark:bg-neutral-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-700">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={32} height={32} />
            <span className="text-xl font-bold text-primary">Thrive Tribe</span>
          </Link>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  active
                    ? "bg-primary-light/10 text-primary"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    active
                      ? "text-primary"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 border-t border-neutral-200 dark:border-neutral-700">
          <Link
            href="/logout"
            className="flex items-center px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-md dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <FaSignOutAlt className="mr-3 flex-shrink-0 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            Sign out
          </Link>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white dark:bg-neutral-800 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              className="lg:hidden text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FaBars className="h-6 w-6" />
            </button>
            <div className="ml-auto flex items-center space-x-4">
              <button className="rounded-full bg-white dark:bg-neutral-700 p-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  A
                </div>
                <span className="ml-2 font-medium text-sm text-neutral-700 dark:text-neutral-300">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
