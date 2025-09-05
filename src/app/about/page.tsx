"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100">
      {/* Header */}
      <header className="py-4 px-6 bg-white dark:bg-slate_blue-200 shadow-sm">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={40} height={40} className="rounded-md" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">Home</Link>
            <Link href="/about" className="text-persian_pink-500 font-medium">About</Link>
            <Link href="/assessment" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">Assessment</Link>
            <Link href="/resources" className="text-slate_blue-400 hover:text-persian_pink-500 transition-colors duration-300">Resources</Link>
          </nav>
          
          <div className="flex space-x-2">
            <Link href="/login" className="py-2 px-4 rounded-full border border-slate_blue-400 text-slate_blue-400 hover:bg-slate_blue-50 transition-colors duration-300">
              Log In
            </Link>
            <Link href="/signup" className="py-2 px-4 rounded-full bg-persian_pink-500 text-white hover:bg-persian_pink-400 transition-colors duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-purple">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5"></div>
          <div className="container-custom relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Thrive Tribe</h1>
              <div className="h-1 w-24 bg-persian_pink-400 mx-auto mb-8"></div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white dark:bg-slate_blue-200">
          <div className="container-custom">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6 text-slate_blue-500">Mission Statement</h2>
              <div className="p-8 rounded-xl bg-gradient-to-br from-slate_blue-50 to-pale_purple-100 dark:from-slate_blue-300/20 dark:to-pale_purple-300/20 shadow-lg">
                <p className="text-lg text-slate_blue-700 dark:text-slate_blue-400 leading-relaxed">
                  To leverage our expertise in data analysis and emerging technologies to
                  promote safe working environments, drive data-driven decision making, and
                  innovate solutions that enhance efficiency and sustainability, specifically
                  in the area of mental health.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-pale_purple-100 dark:bg-slate_blue-300/10">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-2 text-slate_blue-500">Our Solution</h2>
              <div className="h-1 w-24 bg-persian_pink-400 mx-auto"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.div 
                variants={fadeIn}
                className="bg-white dark:bg-slate_blue-200 p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
              >
                <div className="bg-gradient-to-br from-slate_blue-400 to-persian_pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  01
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate_blue-500">Know Your Status</h3>
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-slate_blue-100 dark:bg-slate_blue-300/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate_blue-500">
                      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                      <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                      <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate_blue-600 dark:text-slate_blue-400">
                  Assess your stress levels using our stress level assessment and get DIY strategies to aid your mental health.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="bg-white dark:bg-slate_blue-200 p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
              >
                <div className="bg-gradient-to-br from-slate_blue-400 to-persian_pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  02
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate_blue-500">Protect Your Health</h3>
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-persian_pink-100 dark:bg-persian_pink-300/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-persian_pink-500">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate_blue-600 dark:text-slate_blue-400">
                  Get personalized recommendations and strategies to protect and improve your mental wellbeing.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="bg-white dark:bg-slate_blue-200 p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
              >
                <div className="bg-gradient-to-br from-slate_blue-400 to-persian_pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  03
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate_blue-500">Get Help</h3>
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-amethyst-100 dark:bg-amethyst-300/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amethyst-500">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                      <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate_blue-600 dark:text-slate_blue-400">
                  Connect with mental health professionals near you through our AI-powered matching service.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="bg-white dark:bg-slate_blue-200 p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
              >
                <div className="bg-gradient-to-br from-slate_blue-400 to-persian_pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  04
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate_blue-500">Track Your Progress</h3>
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-african_violet-100 dark:bg-african_violet-300/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-african_violet-500">
                      <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate_blue-600 dark:text-slate_blue-400">
                  Monitor improvements in your mental health over time with our progress tracking tools.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="py-20 bg-white dark:bg-slate_blue-200">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-2 text-slate_blue-500">Our Offerings</h2>
              <div className="h-1 w-24 bg-persian_pink-400 mx-auto mb-4"></div>
              <p className="text-slate_blue-600 dark:text-slate_blue-400 max-w-2xl mx-auto">
                From free basic tools to premium features, we have everything you need for your mental wellbeing journey.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-br from-slate_blue-50 to-slate_blue-100 dark:from-slate_blue-300/20 dark:to-slate_blue-300/10 p-8 rounded-xl shadow-lg overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 bg-slate_blue-500 text-white px-6 py-1 rounded-bl-xl text-sm font-medium">
                  Freemium
                </div>
                <h3 className="text-xl font-bold mb-6 text-slate_blue-500 mt-8">Stress Relief Tools</h3>
                <p className="text-slate_blue-600 dark:text-slate_blue-400 mb-6">
                  Stress relief exercises, motivational audio, stress balls or journaling tools to help manage your stress levels.
                </p>
                <div className="mt-auto pt-4 border-t border-slate_blue-200 dark:border-slate_blue-300/20">
                  <Link href="/resources" className="text-persian_pink-500 hover:text-persian_pink-600 font-medium flex items-center">
                    Explore free tools
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-br from-pale_purple-50 to-pale_purple-100 dark:from-pale_purple-300/20 dark:to-pale_purple-300/10 p-8 rounded-xl shadow-lg overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 bg-persian_pink-500 text-white px-6 py-1 rounded-bl-xl text-sm font-medium">
                  Premium
                </div>
                <h3 className="text-xl font-bold mb-6 text-slate_blue-500 mt-8">Mental Health Resource Library</h3>
                <p className="text-slate_blue-600 dark:text-slate_blue-400 mb-6">
                  Get access to various videos, articles, blogs etc. on specific stress-related mental health challenges.
                </p>
                <div className="mt-auto pt-4 border-t border-pale_purple-200 dark:border-pale_purple-300/20">
                  <Link href="/premium" className="text-persian_pink-500 hover:text-persian_pink-600 font-medium flex items-center">
                    Upgrade to premium
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-br from-persian_pink-50 to-persian_pink-100 dark:from-persian_pink-300/20 dark:to-persian_pink-300/10 p-8 rounded-xl shadow-lg overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 bg-amethyst-500 text-white px-6 py-1 rounded-bl-xl text-sm font-medium">
                  Professional
                </div>
                <h3 className="text-xl font-bold mb-6 text-slate_blue-500 mt-8">Professional Consultations</h3>
                <p className="text-slate_blue-600 dark:text-slate_blue-400 mb-6">
                  Access Mental Health Professionals near you with our AI technology based on your inputted location.
                </p>
                <div className="mt-auto pt-4 border-t border-persian_pink-200 dark:border-persian_pink-300/20">
                  <Link href="/consultations" className="text-persian_pink-500 hover:text-persian_pink-600 font-medium flex items-center">
                    Find professionals
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="py-20 bg-gradient-pink text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-5"></div>
          
          <motion.div 
            className="container-custom relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Conclusion</h2>
              <p className="text-xl mb-8 leading-relaxed">
                At Thrive Tribe, we know that mental health is a journey, and we look forward to taking that first step with you.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/assessment" className="inline-block bg-white text-persian_pink-500 px-8 py-3 rounded-full font-medium shadow-lg hover:bg-pale_purple-100 transition-colors duration-300">
                  Start Your Journey Today
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate_blue-100 text-slate_blue-700 py-12 dark:bg-slate_blue-300/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} className="rounded-lg" />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
              </div>
              <p className="max-w-xs text-slate_blue-600">
                Empowering you to take control of your mental health and wellness journey
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate_blue-400">Site</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-persian_pink-500 transition-colors duration-300">Home</Link></li>
                  <li><Link href="/about" className="hover:text-persian_pink-500 transition-colors duration-300">About</Link></li>
                  <li><Link href="/assessment" className="hover:text-persian_pink-500 transition-colors duration-300">Assessment</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate_blue-400">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="hover:text-persian_pink-500 transition-colors duration-300">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-persian_pink-500 transition-colors duration-300">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate_blue-200 dark:border-slate_blue-300/20 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Thrive Tribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
