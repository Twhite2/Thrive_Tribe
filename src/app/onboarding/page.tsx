"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    ageRange: "",
    gender: "",
    location: "",
    goals: [] as string[],
    concerns: [] as string[],
  });

  const totalSteps = 4;
  
  const goToNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const goToPrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateProfile = (field: string, value: any) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const toggleArrayItem = (field: string, item: string) => {
    const array = profile[field as keyof typeof profile] as string[];
    const newArray = array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
    
    updateProfile(field, newArray);
  };

  const handleComplete = async () => {
    try {
      // In a real app, this would save the profile to the database
      console.log("Profile data:", profile);
      
      // Redirect to assessment
      router.push("/assessment");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      <header className="py-4 px-6 bg-white dark:bg-neutral-800 shadow-sm">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Thrive Tribe Logo" width={36} height={36} />
            <span className="text-lg font-bold text-primary">Thrive Tribe</span>
          </div>
          <div className="text-sm text-neutral-500">
            Step {step} of {totalSteps}
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Progress bar */}
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full mb-8">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-8"
          >
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Tell us about yourself</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      What is your age range?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["18-24", "25-34", "35-44", "45-54", "55-64", "65+"].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => updateProfile("ageRange", age)}
                          className={`py-3 px-4 rounded-md border text-center transition-colors ${
                            profile.ageRange === age
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-neutral-300 dark:border-neutral-600 hover:border-primary"
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">A bit more about you</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      What is your gender?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Male", "Female", "Non-binary", "Prefer not to say"].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => updateProfile("gender", gender)}
                          className={`py-3 px-4 rounded-md border text-center transition-colors ${
                            profile.gender === gender
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-neutral-300 dark:border-neutral-600 hover:border-primary"
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Where are you located?
                    </label>
                    <select
                      value={profile.location}
                      onChange={(e) => updateProfile("location", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Select your region</option>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                      <option value="South America">South America</option>
                      <option value="Africa">Africa</option>
                      <option value="Australia/Oceania">Australia/Oceania</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Your wellness goals</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-center">
                  Select all that apply to you
                </p>
                <div className="space-y-3">
                  {[
                    "Reduce stress and anxiety",
                    "Improve sleep quality",
                    "Boost mood and happiness",
                    "Increase mindfulness",
                    "Improve focus and productivity",
                    "Build emotional resilience",
                  ].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleArrayItem("goals", goal)}
                      className={`w-full py-3 px-4 rounded-md border text-left transition-colors flex items-center ${
                        profile.goals.includes(goal)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-neutral-300 dark:border-neutral-600 hover:border-primary"
                      }`}
                    >
                      <span className="ml-2">{goal}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Your main concerns</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-center">
                  Select all that apply to you
                </p>
                <div className="space-y-3">
                  {[
                    "Stress from work or school",
                    "Relationship issues",
                    "Sleep problems",
                    "Low mood or motivation",
                    "Worry and overthinking",
                    "Burnout",
                    "Life transitions",
                  ].map((concern) => (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleArrayItem("concerns", concern)}
                      className={`w-full py-3 px-4 rounded-md border text-left transition-colors flex items-center ${
                        profile.concerns.includes(concern)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-neutral-300 dark:border-neutral-600 hover:border-primary"
                      }`}
                    >
                      <span className="ml-2">{concern}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <div className="flex justify-between mt-8">
            <button
              onClick={goToPrevious}
              disabled={step === 1}
              className={`btn ${
                step === 1
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-white text-primary border border-primary hover:bg-neutral-100"
              }`}
            >
              Back
            </button>
            <button onClick={goToNext} className="btn-primary">
              {step === totalSteps ? "Complete" : "Next"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
