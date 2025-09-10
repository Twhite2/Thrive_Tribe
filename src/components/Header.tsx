"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export default function Header({ showAuthButtons = true }: HeaderProps) {
  const { session, isPremium } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const isLoggedIn = !!session?.user;
  
  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="py-4 px-4 md:px-6 bg-white dark:bg-slate_blue-200 shadow-sm">
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex items-center space-x-2 transition-transform duration-300 group-hover:scale-105">
            <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} className="rounded-md" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">
            About
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">
                Dashboard
              </Link>
              <Link href="/assessment" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">
                Assessment
              </Link>
            </>
          )}
          <Link href="/resources" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">
            Resources
          </Link>
          <Link href="/library" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">
            Mental Health Library
          </Link>
          {isLoggedIn && isPremium && (
            <Link href="/premium" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">
              Premium
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate_blue-400 hover:text-persian_pink-500"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Right side - Theme toggle and Auth/User section */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {showAuthButtons && !isLoggedIn && (
            <div className="hidden md:flex space-x-3">
              <Link href="/login" className="py-2 px-4 rounded-full border border-slate_blue-400 text-slate_blue-400 hover:bg-slate_blue-50 transition-colors duration-300">
                Log In
              </Link>
              <Link href="/signup" className="py-2 px-4 rounded-full bg-persian_pink-500 text-white hover:bg-persian_pink-400 transition-colors duration-300">
                Sign Up
              </Link>
            </div>
          )}
          
          {isLoggedIn && (
            <div className="flex items-center space-x-2 relative" ref={userMenuRef}>
              {!isPremium && (
                <Link href="/premium" className="hidden md:block text-sm px-3 py-1 rounded-full bg-persian_pink-100 text-persian_pink-500 font-medium hover:bg-persian_pink-200 transition-colors duration-300">
                  Upgrade
                </Link>
              )}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-slate_blue-200 flex items-center justify-center text-slate_blue-600 font-medium cursor-pointer group-hover:bg-slate_blue-300 transition-colors duration-200">
                    {session?.user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate_blue-600 hidden md:inline group-hover:text-slate_blue-700">
                    {session?.user?.name || 'User'}
                  </span>
                </button>
                
                {/* User dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate_blue-200 rounded-md shadow-lg py-1 z-10 border border-slate_blue-100 dark:border-slate_blue-300/30">
                    <div className="px-4 py-3 border-b border-slate_blue-100 dark:border-slate_blue-300/30">
                      <p className="text-sm leading-5 font-medium text-slate_blue-800 dark:text-slate_blue-300">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs leading-4 font-medium text-slate_blue-500 dark:text-slate_blue-400 truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                    <Link 
                      href="/profile"
                      className="block px-4 py-2 text-sm text-slate_blue-600 dark:text-slate_blue-400 hover:bg-slate_blue-50 dark:hover:bg-slate_blue-300/20 transition-colors duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/settings"
                      className="block px-4 py-2 text-sm text-slate_blue-600 dark:text-slate_blue-400 hover:bg-slate_blue-50 dark:hover:bg-slate_blue-300/20 transition-colors duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate_blue-50 dark:hover:bg-slate_blue-300/20 transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate_blue-200 py-4 px-6 shadow-inner border-t border-slate_blue-100 dark:border-slate_blue-300/30">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="py-2 text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="py-2 text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {isLoggedIn && (
              <>
                <Link 
                  href="/dashboard" 
                  className="py-2 text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/assessment" 
                  className="py-2 text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Assessment
                </Link>
              </>
            )}
            <Link 
              href="/resources" 
              className="py-2 text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              href="/library" 
              className="py-2 text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mental Health Library
            </Link>
            {isLoggedIn && isPremium && (
              <Link 
                href="/premium" 
                className="py-2 text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium
              </Link>
            )}
            
            {showAuthButtons && !isLoggedIn && (
              <div className="flex space-x-3 pt-3 border-t border-slate_blue-100 dark:border-slate_blue-300/20">
                <Link 
                  href="/login" 
                  className="flex-1 py-2 px-4 text-center rounded-full border border-slate_blue-400 text-slate_blue-400 hover:bg-slate_blue-50 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  href="/signup" 
                  className="flex-1 py-2 px-4 text-center rounded-full bg-persian_pink-500 text-white hover:bg-persian_pink-400 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
