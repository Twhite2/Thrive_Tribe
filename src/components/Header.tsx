"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export default function Header({ showAuthButtons = true }: HeaderProps) {
  const { session, isPremium } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isLoggedIn = !!session?.user;

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
            <div className="flex items-center space-x-2">
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
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate_blue-200 py-4 px-6 shadow-inner border-t border-slate_blue-100 dark:border-slate_blue-300/30">
          <div className="flex flex-col space-y-3">
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
