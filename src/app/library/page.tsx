"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Video interface
interface Video {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  duration?: string;
  category: 'anxiety' | 'depression' | 'burnout' | 'overwhelmed';
}

// Helper function to extract YouTube video ID
const getYoutubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Function to get YouTube thumbnail URL
const getYoutubeThumbnail = (videoId: string): string => {
  // Use maxresdefault for higher quality, with fallback to default
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

// All mental health videos
const allVideos: Video[] = [
  // Anxiety videos
  {
    id: 'anxiety-1',
    title: 'How to calm down anxiety and your mind',
    url: 'https://youtu.be/mKW4ZFP8bGY?si=zLaRjuCAnkEESaKB',
    category: 'anxiety',
    duration: '7 min'
  },
  {
    id: 'anxiety-2',
    title: '7 signs of Anxiety',
    url: 'https://youtube.com/shorts/dM--lHKJeA4?si=IRh4WXZNHnZ87E-W',
    category: 'anxiety',
    duration: '1 min'
  },
  {
    id: 'anxiety-3',
    title: 'Anxiety hack exercises',
    url: 'https://youtube.com/shorts/BglgioFwmMc?si=apjlA0mK_exAFGLS',
    category: 'anxiety',
    duration: '1 min'
  },
  {
    id: 'anxiety-4',
    title: 'How to cope with anxiety | Olivia Remes (TEDxUHasselt)',
    url: 'https://www.youtube.com/watch?v=WWloIAQpMcQ',
    category: 'anxiety',
    duration: '15 min'
  },
  {
    id: 'anxiety-5',
    title: 'How to Deal With Anxiety – The Step-by-Step Guide',
    url: 'https://www.youtube.com/watch?v=PxjxY9VilCs',
    category: 'anxiety',
    duration: '11 min'
  },
  {
    id: 'anxiety-6',
    title: 'Calming Anxiety With Your Body\'s Built-in Anti-Anxiety Response',
    url: 'https://www.youtube.com/watch?v=SkJdKsiCyyM',
    category: 'anxiety',
    duration: '10 min'
  },
  {
    id: 'anxiety-7',
    title: 'Lasting Treatments for Anxiety vs. Coping Skills',
    url: 'https://www.youtube.com/watch?v=SA1Dz8BloUY',
    category: 'anxiety',
    duration: '6 min'
  },
  {
    id: 'anxiety-8',
    title: '10-Minute Meditation For Anxiety | Goodful',
    url: 'https://www.youtube.com/watch?v=O-6f5wQXSu8',
    category: 'anxiety',
    duration: '10 min'
  },

  // Depression videos
  {
    id: 'depression-1',
    title: 'Manage Depression, Stress and Burnout | THRiVE',
    url: 'https://www.youtube.com/watch?v=k25JxRBgVLA',
    category: 'depression',
    duration: '12 min'
  },
  {
    id: 'depression-2',
    title: 'Depression and Its Treatment Explained',
    url: 'https://www.youtube.com/watch?v=z-IR48Mb3W0',
    category: 'depression',
    duration: '8 min'
  },
  {
    id: 'depression-3',
    title: 'Signs of Depression You Shouldn\'t Ignore | MedCircle',
    url: 'https://www.youtube.com/watch?v=xbagFzcyNiM',
    category: 'depression',
    duration: '14 min'
  },
  {
    id: 'depression-4',
    title: 'How to Get Through Depression – Motivational Doc',
    url: 'https://www.youtube.com/watch?v=QpoHMcZ0PZ4',
    category: 'depression',
    duration: '16 min'
  },
  {
    id: 'depression-5',
    title: 'Depression: A Global Crisis | WHO Documentary',
    url: 'https://www.youtube.com/watch?v=XiCrniLQGYc',
    category: 'depression',
    duration: '40 min'
  },

  // Burnout videos
  {
    id: 'burnout-1',
    title: 'Escaping the Anxiety/Burnout/Depression Cycle – Therapy in a Nutshell',
    url: 'https://www.youtube.com/watch?v=8vfLmShk7MM',
    category: 'burnout',
    duration: '9 min'
  },
  {
    id: 'burnout-2',
    title: 'Overloaded, Exhausted, and Ready for a Reset: 3 Doctors Give Advice',
    url: 'https://www.youtube.com/watch?v=892M1vCEuUg',
    category: 'burnout',
    duration: '13 min'
  },
  {
    id: 'burnout-3',
    title: 'Tips to deal with burnout at work',
    url: 'https://www.youtube.com/watch?v=ZT66bdeFqbM',
    category: 'burnout',
    duration: '7 min'
  },
  {
    id: 'burnout-4',
    title: 'Beating Burnout',
    url: 'https://www.youtube.com/watch?v=XAtTkMpACFc',
    category: 'burnout',
    duration: '10 min'
  },
  {
    id: 'burnout-5',
    title: 'Preventing and Recovering from Burnout (Webinar)',
    url: 'https://www.youtube.com/watch?v=C9SZrbcEdMM',
    category: 'burnout',
    duration: '60 min'
  },

  // Feeling Overwhelmed videos
  {
    id: 'overwhelmed-1',
    title: 'Feeling Really Overwhelmed? Discover the Science of Emotion Regulation',
    url: 'https://www.youtube.com/watch?v=8uZNGWPpdms',
    category: 'overwhelmed',
    duration: '11 min'
  },
  {
    id: 'overwhelmed-2',
    title: 'Feeling Overwhelmed? Dr. Jessi Gold on Burnout, Anxiety, and Stress',
    url: 'https://www.youtube.com/watch?v=S1Zj6cQqK3w',
    category: 'overwhelmed',
    duration: '15 min'
  },
  {
    id: 'overwhelmed-3',
    title: 'If You Struggle With Stress & Anxiety, This Will Change Your Life',
    url: 'https://www.youtube.com/watch?v=6TiJuzF0iD0',
    category: 'overwhelmed',
    duration: '13 min'
  },
  {
    id: 'overwhelmed-4',
    title: 'Overwhelmed by Stress? Watch This Before You Burn Out',
    url: 'https://www.youtube.com/watch?v=DSTMxqpObEE',
    category: 'overwhelmed',
    duration: '8 min'
  },
  {
    id: 'overwhelmed-5',
    title: 'How to Calm Overwhelm in 3 Minutes | Mindful Exercises',
    url: 'https://www.youtube.com/watch?v=3nQNiWdeH2Q',
    category: 'overwhelmed',
    duration: '5 min'
  }
];

// Process videos to add thumbnail URLs
const videos = allVideos.map(video => {
  const videoId = getYoutubeVideoId(video.url);
  return {
    ...video,
    thumbnailUrl: videoId ? getYoutubeThumbnail(videoId) : undefined
  };
});

// Category colors and icons
const categoryInfo = {
  anxiety: {
    color: 'bg-persian_pink-100 text-persian_pink-500 dark:bg-persian_pink-500/30 dark:text-persian_pink-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  depression: {
    color: 'bg-slate_blue-100 text-slate_blue-500 dark:bg-slate_blue-500/30 dark:text-slate_blue-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  burnout: {
    color: 'bg-amethyst-100 text-amethyst-500 dark:bg-amethyst-500/30 dark:text-amethyst-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  overwhelmed: {
    color: 'bg-pale_purple-100 text-pale_purple-500 dark:bg-pale_purple-500/30 dark:text-pale_purple-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
};

export default function MentalHealthLibrary() {
  const [activeCategory, setActiveCategory] = useState<'anxiety' | 'depression' | 'burnout' | 'overwhelmed' | 'all'>('all');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = videos;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(video => video.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(video => video.title.toLowerCase().includes(term));
    }
    
    setFilteredVideos(filtered);
  }, [activeCategory, searchTerm]);

  const openVideoUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-pale_purple-500 dark:bg-slate_blue-100 flex flex-col">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Mental Health Library</h1>
            <p className="text-xl mb-8">
              Browse our collection of curated videos to support your mental wellness journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search videos..."
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

      {/* Category Tabs */}
      <section className="bg-white dark:bg-slate_blue-200 py-6 shadow-md sticky top-0 z-20">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === 'all'
                  ? 'bg-slate_blue-500 text-white'
                  : 'bg-slate_blue-100 dark:bg-slate_blue-300/20 text-slate_blue-600 dark:text-slate_blue-300 hover:bg-slate_blue-200 dark:hover:bg-slate_blue-400/20'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveCategory('anxiety')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center space-x-1 ${
                activeCategory === 'anxiety'
                  ? 'bg-persian_pink-500 text-white'
                  : 'bg-persian_pink-100 dark:bg-persian_pink-500/20 text-persian_pink-600 dark:text-persian_pink-300 hover:bg-persian_pink-200 dark:hover:bg-persian_pink-500/30'
              }`}
            >
              <span>{categoryInfo.anxiety.icon}</span>
              <span>Anxiety</span>
            </button>
            <button
              onClick={() => setActiveCategory('depression')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center space-x-1 ${
                activeCategory === 'depression'
                  ? 'bg-slate_blue-500 text-white'
                  : 'bg-slate_blue-100 dark:bg-slate_blue-500/20 text-slate_blue-600 dark:text-slate_blue-300 hover:bg-slate_blue-200 dark:hover:bg-slate_blue-500/30'
              }`}
            >
              <span>{categoryInfo.depression.icon}</span>
              <span>Depression</span>
            </button>
            <button
              onClick={() => setActiveCategory('burnout')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center space-x-1 ${
                activeCategory === 'burnout'
                  ? 'bg-amethyst-500 text-white'
                  : 'bg-amethyst-100 dark:bg-amethyst-500/20 text-amethyst-600 dark:text-amethyst-300 hover:bg-amethyst-200 dark:hover:bg-amethyst-500/30'
              }`}
            >
              <span>{categoryInfo.burnout.icon}</span>
              <span>Burnout</span>
            </button>
            <button
              onClick={() => setActiveCategory('overwhelmed')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center space-x-1 ${
                activeCategory === 'overwhelmed'
                  ? 'bg-pale_purple-500 text-white'
                  : 'bg-pale_purple-100 dark:bg-pale_purple-500/20 text-pale_purple-600 dark:text-pale_purple-300 hover:bg-pale_purple-200 dark:hover:bg-pale_purple-500/30'
              }`}
            >
              <span>{categoryInfo.overwhelmed.icon}</span>
              <span>Feeling Overwhelmed</span>
            </button>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12 flex-grow">
        <div className="container-custom">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => {
                const videoId = getYoutubeVideoId(video.url);
                return (
                  <motion.div
                    key={video.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    onClick={() => openVideoUrl(video.url)}
                    className="bg-white dark:bg-slate_blue-200 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  >
                    <div className="relative aspect-video">
                      {video.thumbnailUrl ? (
                        <Image 
                          src={video.thumbnailUrl} 
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite error loop
                            target.style.display = 'none';
                            // Parent element will show the gradient background
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate_blue-300 to-persian_pink-300">
                          <span className="text-white font-medium">Video Thumbnail</span>
                        </div>
                      )}
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-persian_pink-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Category badge */}
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${categoryInfo[video.category].color}`}>
                        <span>{categoryInfo[video.category].icon}</span>
                        <span className="capitalize">{video.category}</span>
                      </div>
                      
                      {/* Duration badge */}
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                          {video.duration}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 text-slate_blue-700 dark:text-slate_blue-400 line-clamp-2 h-14">
                        {video.title}
                      </h3>
                      
                      <div className="pt-3 flex justify-between items-center">
                        <span className="text-xs text-slate_blue-500 dark:text-slate_blue-300">YouTube Video</span>
                        <span className="text-persian_pink-500 dark:text-persian_pink-300 text-sm font-medium flex items-center">
                          Watch Now
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate_blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mt-4 text-slate_blue-500">No videos found</h3>
              <p className="text-slate_blue-400 mt-2">Try changing your category or search term</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate_blue-100 text-slate_blue-700 py-12 dark:bg-slate_blue-300/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} className="rounded-lg" />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-blend">Thrive Tribe</span>
              </div>
              <p className="max-w-xs text-slate_blue-600 dark:text-slate_blue-400">
                Our mission is to make mental health care accessible, affordable, and stigma-free by empowering individuals with simple digital tools, personalized strategies, and professional support to live healthier, balanced lives.
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
                <h4 className="text-lg font-bold mb-4 text-slate_blue-400">Platform Notes</h4>
                <ul className="space-y-2">
                  <li className="text-slate_blue-600 dark:text-slate_blue-400">After assessment → sign up with Google, Yahoo, etc.</li>
                  <li className="text-slate_blue-600 dark:text-slate_blue-400">Mental Health Library moved to Freemium model</li>
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
