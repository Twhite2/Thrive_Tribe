"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-purple text-white overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container-custom text-center relative z-10"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Your Journey to <span className="text-pale_purple-500">Mental Wellness</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Personalized self-care strategies to help you thrive in your everyday life
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/assessment" className="btn bg-persian_pink-500 text-white hover:bg-persian_pink-400 text-lg px-8 py-3 shadow-lg transition-all duration-300 rounded-lg">
              Start Your Assessment
            </Link>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute hidden md:block"
            style={{ top: '30%', left: '5%' }}
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6,
              ease: "easeInOut" 
            }}
          >
            <div className="w-20 h-20 rounded-full bg-slate_blue-300 opacity-50 blur-md"></div>
          </motion.div>
          
          <motion.div 
            className="absolute hidden md:block"
            style={{ bottom: '20%', right: '10%' }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <div className="w-16 h-16 rounded-full bg-persian_pink-400 opacity-40 blur-md"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-pale_purple-500 dark:bg-slate_blue-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-5"></div>
        
        <div className="container-custom relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate_blue-400 mb-4">How Thrive Tribe Helps You</h2>
            <div className="w-16 md:w-24 h-1 bg-persian_pink-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate_blue-200 p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
            >
              <div className="text-3xl md:text-4xl text-slate_blue-400 mb-5 md:mb-6 flex justify-center">
                <div className="bg-slate_blue-100 p-3 md:p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                    <path d="M8 5h8V7H8V5zm0 4h8v2H8V9zm0 4h6v2H8v-2zm8 7H8v-2h8v2z"/>
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate_blue-400">Personalized Assessment</h3>
              <p className="text-sm md:text-base text-slate_blue-600 dark:text-slate_blue-400">
                Take our science-backed stress assessment to understand your mental wellbeing
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate_blue-200 p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
            >
              <div className="text-3xl md:text-4xl text-persian_pink-400 mb-5 md:mb-6 flex justify-center">
                <div className="bg-persian_pink-100 p-3 md:p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-persian_pink-400">Tailored Strategies</h3>
              <p className="text-sm md:text-base text-slate_blue-600 dark:text-slate_blue-400">
                Receive personalized recommendations based on your assessment results
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate_blue-200 p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
            >
              <div className="text-3xl md:text-4xl text-amethyst-400 mb-5 md:mb-6 flex justify-center">
                <div className="bg-amethyst-100 p-3 md:p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                    <path d="M12 11c-0.55 0-1 0.45-1 1s0.45 1 1 1 1-0.45 1-1-0.45-1-1-1z"/>
                    <path d="M7 9.5C7 8.67 7.67 8 8.5 8S10 8.67 10 9.5 9.33 11 8.5 11 7 10.33 7 9.5z"/>
                    <path d="M14 9.5c0-0.83 0.67-1.5 1.5-1.5s1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5-1.5-0.67-1.5-1.5z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-amethyst-400">Guided Practices</h3>
              <p className="text-sm md:text-base text-slate_blue-600 dark:text-slate_blue-400">
                Access videos, articles, and exercises designed to improve your wellbeing
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate_blue-200 p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col items-center"
            >
              <div className="text-3xl md:text-4xl text-african_violet-400 mb-5 md:mb-6 flex justify-center">
                <div className="bg-african_violet-100 p-3 md:p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                    <path d="M3 19h18v2H3z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-african_violet-400">Track Progress</h3>
              <p className="text-sm md:text-base text-slate_blue-600 dark:text-slate_blue-400">
                Monitor your mental wellness journey with regular check-ins and progress tracking
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-pink text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/wave-pattern.png')]"></div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 hidden lg:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut" 
          }}
        >
          <div className="w-32 h-32 rounded-full bg-persian_pink-300 opacity-20 blur-md"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-10 hidden lg:block"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="w-24 h-24 rounded-full bg-slate_blue-300 opacity-20 blur-md"></div>
        </motion.div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Start Your Wellness Journey Today
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of users who have improved their mental wellbeing with Thrive Tribe
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/signup" 
                className="bg-white text-persian_pink-500 hover:bg-pale_purple-500 hover:text-slate_blue-400 text-lg px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300"
              >
                Create Free Account
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate_blue-100 text-slate_blue-700 py-16">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between"
          >
            <div className="mb-8 md:mb-0">
              <motion.div 
                className="flex items-center space-x-3 mb-5"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={40} height={40} className="rounded-lg" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
              </motion.div>
              <p className="max-w-xs text-slate_blue-600">
                Empowering you to take control of your mental health and wellness journey
              </p>
              
              <div className="mt-6 flex space-x-4">
                {/* Social Icons */}
                <motion.a href="#" whileHover={{ y: -5 }} className="bg-slate_blue-200 p-2 rounded-full text-slate_blue-500 hover:bg-slate_blue-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </motion.a>
                <motion.a href="#" whileHover={{ y: -5 }} className="bg-slate_blue-200 p-2 rounded-full text-slate_blue-500 hover:bg-slate_blue-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </motion.a>
                <motion.a href="#" whileHover={{ y: -5 }} className="bg-slate_blue-200 p-2 rounded-full text-slate_blue-500 hover:bg-slate_blue-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate_blue-400">Company</h4>
                <ul className="space-y-3">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/about" className="hover:text-persian_pink-400 transition-colors duration-300">About Us</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/team" className="hover:text-persian_pink-400 transition-colors duration-300">Our Team</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/contact" className="hover:text-persian_pink-400 transition-colors duration-300">Contact</Link>
                  </motion.li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate_blue-400">Resources</h4>
                <ul className="space-y-3">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/blog" className="hover:text-persian_pink-400 transition-colors duration-300">Blog</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/faq" className="hover:text-persian_pink-400 transition-colors duration-300">FAQ</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/support" className="hover:text-persian_pink-400 transition-colors duration-300">Support</Link>
                  </motion.li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate_blue-400">Legal</h4>
                <ul className="space-y-3">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/privacy" className="hover:text-persian_pink-400 transition-colors duration-300">Privacy Policy</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/terms" className="hover:text-persian_pink-400 transition-colors duration-300">Terms of Service</Link>
                  </motion.li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate_blue-400">Platform Notes</h4>
                <ul className="space-y-3">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <span className="text-slate_blue-600 dark:text-slate_blue-400">After assessment → sign up with Google, Yahoo, etc.</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <span className="text-slate_blue-600 dark:text-slate_blue-400">Mental Health Library moved to Freemium model</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="border-t border-slate_blue-200 mt-10 pt-8 text-center text-slate_blue-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>&copy; {new Date().getFullYear()} Thrive Tribe. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
