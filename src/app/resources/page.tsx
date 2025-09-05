"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Resource interface
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'exercise' | 'meditation';
  thumbnail: string;
  premium: boolean;
  category: 'stress' | 'anxiety' | 'mood' | 'sleep' | 'relationships' | 'resilience';
  duration?: string;
  link: string;
}

// Sample resources data
const resourcesData: Resource[] = [
  {
    id: '1',
    title: 'Understanding Stress: Causes and Effects',
    description: 'Learn about the science behind stress and how it affects your mind and body.',
    type: 'article',
    thumbnail: '/images/resources/stress-article.jpg',
    premium: false,
    category: 'stress',
    duration: '5 min read',
    link: '/resources/articles/understanding-stress'
  },
  {
    id: '2',
    title: 'Guided Meditation for Anxiety Relief',
    description: 'A 10-minute guided meditation to help reduce anxiety and promote calmness.',
    type: 'meditation',
    thumbnail: '/images/resources/meditation.jpg',
    premium: false,
    category: 'anxiety',
    duration: '10 min',
    link: '/resources/meditations/anxiety-relief'
  },
  {
    id: '3',
    title: 'Progressive Muscle Relaxation Technique',
    description: 'Learn how to perform progressive muscle relaxation to release physical tension.',
    type: 'exercise',
    thumbnail: '/images/resources/relaxation.jpg',
    premium: false,
    category: 'stress',
    duration: '8 min',
    link: '/resources/exercises/muscle-relaxation'
  },
  {
    id: '4',
    title: 'Building Healthy Sleep Habits',
    description: 'Expert tips for improving your sleep quality and establishing a healthy sleep routine.',
    type: 'article',
    thumbnail: '/images/resources/sleep.jpg',
    premium: true,
    category: 'sleep',
    duration: '7 min read',
    link: '/resources/articles/sleep-habits'
  },
  {
    id: '5',
    title: 'Understanding Cognitive Distortions',
    description: 'Learn to identify and challenge negative thought patterns that contribute to anxiety.',
    type: 'video',
    thumbnail: '/images/resources/cognitive.jpg',
    premium: true,
    category: 'anxiety',
    duration: '15 min',
    link: '/resources/videos/cognitive-distortions'
  },
  {
    id: '6',
    title: '5-Minute Breathing Exercise for Instant Calm',
    description: 'A quick breathing technique you can use anywhere to reduce stress and anxiety.',
    type: 'exercise',
    thumbnail: '/images/resources/breathing.jpg',
    premium: false,
    category: 'stress',
    duration: '5 min',
    link: '/resources/exercises/breathing-technique'
  },
  {
    id: '7',
    title: 'Managing Workplace Stress',
    description: 'Effective strategies for handling stress and pressure in professional settings.',
    type: 'article',
    thumbnail: '/images/resources/workplace.jpg',
    premium: true,
    category: 'stress',
    duration: '8 min read',
    link: '/resources/articles/workplace-stress'
  },
  {
    id: '8',
    title: 'Mood-Boosting Movement Routine',
    description: 'A gentle physical routine designed to release endorphins and improve your mood.',
    type: 'exercise',
    thumbnail: '/images/resources/movement.jpg',
    premium: true,
    category: 'mood',
    duration: '12 min',
    link: '/resources/exercises/mood-movement'
  },
  {
    id: '9',
    title: 'Building Emotional Resilience',
    description: 'Develop skills to bounce back from challenges and adapt to difficult situations.',
    type: 'video',
    thumbnail: '/images/resources/resilience.jpg',
    premium: true,
    category: 'resilience',
    duration: '18 min',
    link: '/resources/videos/emotional-resilience'
  },
  {
    id: '10',
    title: 'Effective Communication in Relationships',
    description: 'Learn techniques for healthier communication with partners, family, and friends.',
    type: 'article',
    thumbnail: '/images/resources/communication.jpg',
    premium: true,
    category: 'relationships',
    duration: '9 min read',
    link: '/resources/articles/effective-communication'
  },
  {
    id: '11',
    title: 'Body Scan Meditation for Better Sleep',
    description: 'A calming meditation practice to help you relax before bedtime and improve sleep quality.',
    type: 'meditation',
    thumbnail: '/images/resources/body-scan.jpg',
    premium: false,
    category: 'sleep',
    duration: '15 min',
    link: '/resources/meditations/body-scan'
  },
  {
    id: '12',
    title: 'Understanding Panic Attacks',
    description: 'What causes panic attacks and evidence-based methods to manage and prevent them.',
    type: 'article',
    thumbnail: '/images/resources/panic.jpg',
    premium: false,
    category: 'anxiety',
    duration: '6 min read',
    link: '/resources/articles/panic-attacks'
  },
];

// Resource type icons
const typeIcons = {
  video: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
    </svg>
  ),
  article: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
  exercise: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  ),
  meditation: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
    </svg>
  ),
};

// Category colors
const categoryColors = {
  stress: 'bg-slate_blue-100 text-slate_blue-500',
  anxiety: 'bg-persian_pink-100 text-persian_pink-500',
  mood: 'bg-amethyst-100 text-amethyst-500',
  sleep: 'bg-african_violet-100 text-african_violet-500',
  relationships: 'bg-pale_purple-100 text-slate_blue-500',
  resilience: 'bg-persian_pink-100 text-persian_pink-500',
};

export default function Resources() {
  const { isPremium } = useAuth();
  const [filter, setFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState<Resource[]>(resourcesData);

  // Filter resources based on type, category, and search term
  useEffect(() => {
    let filtered = resourcesData;
    
    // Filter by premium access
    if (!isPremium) {
      filtered = filtered.filter(resource => !resource.premium);
    }
    
    // Filter by type
    if (filter) {
      filtered = filtered.filter(resource => resource.type === filter);
    }
    
    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(resource => resource.category === categoryFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        resource => 
          resource.title.toLowerCase().includes(term) || 
          resource.description.toLowerCase().includes(term)
      );
    }
    
    setResources(filtered);
  }, [filter, categoryFilter, searchTerm, isPremium]);

  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-purple text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5"
        />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mental Health Resources</h1>
            <p className="text-xl mb-8">
              Access our library of articles, videos, exercises, and meditations to support your mental wellbeing.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full py-3 px-5 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white absolute right-4 top-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white dark:bg-slate_blue-200 py-6 shadow-md sticky top-0 z-20">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center md:justify-between items-center">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === null
                    ? 'bg-slate_blue-500 text-white'
                    : 'bg-slate_blue-100 text-slate_blue-600 hover:bg-slate_blue-200'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setFilter('article')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === 'article'
                    ? 'bg-slate_blue-500 text-white'
                    : 'bg-slate_blue-100 text-slate_blue-600 hover:bg-slate_blue-200'
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === 'video'
                    ? 'bg-slate_blue-500 text-white'
                    : 'bg-slate_blue-100 text-slate_blue-600 hover:bg-slate_blue-200'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setFilter('exercise')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === 'exercise'
                    ? 'bg-slate_blue-500 text-white'
                    : 'bg-slate_blue-100 text-slate_blue-600 hover:bg-slate_blue-200'
                }`}
              >
                Exercises
              </button>
              <button
                onClick={() => setFilter('meditation')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === 'meditation'
                    ? 'bg-slate_blue-500 text-white'
                    : 'bg-slate_blue-100 text-slate_blue-600 hover:bg-slate_blue-200'
                }`}
              >
                Meditations
              </button>
            </div>
            
            {/* Category Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => setCategoryFilter(e.target.value || null)}
                className="appearance-none px-4 py-2 pr-8 rounded-full bg-slate_blue-50 text-slate_blue-600 border border-slate_blue-200 focus:outline-none focus:ring-2 focus:ring-slate_blue-300"
                defaultValue=""
              >
                <option value="">All Categories</option>
                <option value="stress">Stress Management</option>
                <option value="anxiety">Anxiety</option>
                <option value="mood">Mood Enhancement</option>
                <option value="sleep">Sleep</option>
                <option value="relationships">Relationships</option>
                <option value="resilience">Resilience</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate_blue-500 absolute right-3 top-3 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 flex-grow">
        <div className="container-custom">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate_blue-200 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-48 bg-slate_blue-100">
                    {/* Placeholder for thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate_blue-300 to-persian_pink-300">
                      <span className="text-white font-medium">Resource Thumbnail</span>
                    </div>
                    
                    {/* Resource type badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-slate_blue-500 font-medium text-sm flex items-center space-x-1">
                      <span className="text-slate_blue-500">{typeIcons[resource.type]}</span>
                      <span className="capitalize">{resource.type}</span>
                    </div>
                    
                    {/* Premium badge */}
                    {resource.premium && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-persian_pink-500 text-white font-medium text-xs">
                        PREMIUM
                      </div>
                    )}
                    
                    {/* Duration badge */}
                    {resource.duration && (
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 text-white text-xs">
                        {resource.duration}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    {/* Category tag */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[resource.category]}`}>
                      {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-slate_blue-700 dark:text-slate_blue-400">
                      {resource.title}
                    </h3>
                    
                    <p className="text-slate_blue-600 dark:text-slate_blue-500 text-sm mb-4">
                      {resource.description}
                    </p>
                    
                    <div className="pt-4 border-t border-slate_blue-100">
                      {resource.premium && !isPremium ? (
                        <Link 
                          href="/premium" 
                          className="inline-flex items-center font-medium text-persian_pink-500 hover:text-persian_pink-600"
                        >
                          Unlock with Premium
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      ) : (
                        <Link 
                          href={resource.link} 
                          className="inline-flex items-center font-medium text-slate_blue-500 hover:text-slate_blue-700"
                        >
                          View Resource
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate_blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mt-4 text-slate_blue-500">No resources found</h3>
              <p className="text-slate_blue-400 mt-2">Try changing your filters or search term</p>
            </div>
          )}
        </div>
      </section>

      {/* Premium CTA (for non-premium users) */}
      {!isPremium && (
        <section className="py-16 bg-gradient-pink text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-5"></div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="container-custom relative z-10"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Unlock Premium Resources</h2>
              <p className="text-xl mb-8">
                Upgrade to Premium to access our complete library of mental wellness content and expert-guided exercises.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/premium"
                  className="inline-block bg-white text-persian_pink-500 hover:bg-pale_purple-100 py-3 px-8 rounded-full font-medium shadow-lg transition-colors duration-300"
                >
                  Upgrade to Premium
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      )}

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
}
