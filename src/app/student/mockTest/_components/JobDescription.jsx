// student/mockTest/_components/JobDescription.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Code2,
  Briefcase,
  FileText,
  ArrowRight,
  Award,
  Zap,
  Shield,
  Clock,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useUser } from "@/hooks/useUser";
import api from "@/utils/api";

const JobDescription = ({ setStepCount, questionIdSetKar }) => {
  const { userData } = useUser();
  const [formData, setFormData] = useState({
    technology: "",
    experience: "",
    questionsNumber: "",
    userId: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?._id) {
      setFormData((prev) => ({
        ...prev,
        userId: userData._id,
      }));
    }
  }, [userData]);

  const technologies = [
    {
      value: "react",
      label: "React.js",
      level: "Advanced",
      icon: "⚛️",
      color: "from-cyan-500 to-blue-500",
    },
    {
      value: "javascript",
      label: "JavaScript",
      level: "Expert",
      icon: "📜",
      color: "from-yellow-500 to-amber-500",
    },
    {
      value: "nodejs",
      label: "Node.js",
      level: "Advanced",
      icon: "🟢",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "express",
      label: "Express.js",
      level: "Intermediate",
      icon: "🚂",
      color: "from-gray-500 to-slate-500",
    },
    {
      value: "mongodb",
      label: "MongoDB",
      level: "Intermediate",
      icon: "🍃",
      color: "from-green-600 to-teal-500",
    },
    {
      value: "java",
      label: "Java",
      level: "Expert",
      icon: "☕",
      color: "from-red-500 to-orange-500",
    },
    {
      value: "python",
      label: "Python",
      level: "Advanced",
      icon: "🐍",
      color: "from-blue-500 to-indigo-500",
    },
    {
      value: "typescript",
      label: "TypeScript",
      level: "Advanced",
      icon: "📘",
      color: "from-blue-600 to-purple-500",
    },
    {
      value: "nextjs",
      label: "Next.js",
      level: "Advanced",
      icon: "▲",
      color: "from-black to-gray-700",
    },
  ];

  const experienceLevels = [
    { value: "0-1", label: "0-1 years", level: "Entry Level", icon: "🌱" },
    { value: "1-3", label: "1-3 years", level: "Junior", icon: "🌿" },
    { value: "3-5", label: "3-5 years", level: "Mid-Level", icon: "🌳" },
    { value: "5-8", label: "5-8 years", level: "Senior", icon: "🏆" },
    { value: "8+", label: "8+ years", level: "Lead/Architect", icon: "👑" },
  ];

  const questionCounts = [
    { value: "5", label: "5 questions", duration: "~15 mins", icon: "⚡" },
    { value: "10", label: "10 questions", duration: "~30 mins", icon: "🔥" },
    { value: "15", label: "15 questions", duration: "~45 mins", icon: "💪" },
    { value: "20", label: "20 questions", duration: "~60 mins", icon: "🎯" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.technology)
      newErrors.technology = "Please select a technology";
    if (!formData.experience)
      newErrors.experience = "Please select experience level";
    if (!formData.questionsNumber)
      newErrors.questionsNumber = "Please select number of questions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await api.post(`/api/interview/create`, formData);

      if (response.data.success) {
        questionIdSetKar(response.data.data._id);
        setStepCount(2);
      }
    } catch (error) {
      console.log("error while submit the data", error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedTechnology = () => {
    return technologies.find((t) => t.value === formData.technology);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl mb-6 border border-pink-500/30">
            <Zap className="h-8 w-8 text-pink-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Practice Your Way to Success
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Customize your interview experience and get real-time feedback to
            ace your next tech interview
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-pink-500/20 shadow-2xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gray-800/50 px-8 py-6 border-b border-pink-500/20">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <StepIndicator
                number={1}
                title="Configure"
                active={true}
                completed={false}
              />
              <StepIndicator
                number={2}
                title="Interview"
                active={false}
                completed={false}
              />
              <StepIndicator
                number={3}
                title="Report"
                active={false}
                completed={false}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10">
            <form className="space-y-8">
              {/* Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Technology Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    <span className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-pink-500" />
                      Technology Stack
                    </span>
                  </label>
                  <div className="relative group">
                    <select
                      name="technology"
                      value={formData.technology}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-4 bg-black/50 border-2 rounded-xl appearance-none
                        focus:outline-none focus:ring-4 transition-all text-white
                        ${
                          errors.technology
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
                        }
                      `}
                    >
                      <option value="" className="bg-gray-900">
                        Select Technology
                      </option>
                      {technologies.map((tech) => (
                        <option
                          key={tech.value}
                          value={tech.value}
                          className="bg-gray-900"
                        >
                          {tech.icon} {tech.label} • {tech.level}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="w-5 h-5 text-pink-500 rotate-90" />
                    </div>
                  </div>
                  {errors.technology && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.technology}
                    </p>
                  )}
                </div>

                {/* Experience Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-pink-500" />
                      Experience Level
                    </span>
                  </label>
                  <div className="relative group">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-4 bg-black/50 border-2 rounded-xl appearance-none
                        focus:outline-none focus:ring-4 transition-all text-white
                        ${
                          errors.experience
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
                        }
                      `}
                    >
                      <option value="" className="bg-gray-900">
                        Select Experience
                      </option>
                      {experienceLevels.map((exp) => (
                        <option
                          key={exp.value}
                          value={exp.value}
                          className="bg-gray-900"
                        >
                          {exp.icon} {exp.label} • {exp.level}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="w-5 h-5 text-pink-500 rotate-90" />
                    </div>
                  </div>
                  {errors.experience && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Questions Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-pink-500" />
                      Number of Questions
                    </span>
                  </label>
                  <div className="relative group">
                    <select
                      name="questionsNumber"
                      value={formData.questionsNumber}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-4 bg-black/50 border-2 rounded-xl appearance-none
                        focus:outline-none focus:ring-4 transition-all text-white
                        ${
                          errors.questionsNumber
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
                        }
                      `}
                    >
                      <option value="" className="bg-gray-900">
                        Select Questions
                      </option>
                      {questionCounts.map((q) => (
                        <option
                          key={q.value}
                          value={q.value}
                          className="bg-gray-900"
                        >
                          {q.icon} {q.label} • {q.duration}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="w-5 h-5 text-pink-500 rotate-90" />
                    </div>
                  </div>
                  {errors.questionsNumber && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.questionsNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Selected Configuration Summary */}
              {formData.technology &&
                formData.experience &&
                formData.questionsNumber && (
                  <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-pink-500/20">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">
                          Interview Configuration Ready
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="font-medium text-pink-500">
                              Technology:
                            </span>
                            <span className="bg-black/50 px-2 py-1 rounded-lg border border-pink-500/20">
                              {getSelectedTechnology()?.icon}{" "}
                              {getSelectedTechnology()?.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="font-medium text-pink-500">
                              Experience:
                            </span>
                            <span className="bg-black/50 px-2 py-1 rounded-lg border border-pink-500/20">
                              {
                                experienceLevels.find(
                                  (e) => e.value === formData.experience,
                                )?.label
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="font-medium text-pink-500">
                              Questions:
                            </span>
                            <span className="bg-black/50 px-2 py-1 rounded-lg border border-pink-500/20">
                              {
                                questionCounts.find(
                                  (q) => q.value === formData.questionsNumber,
                                )?.label
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <FeatureCard
                  icon={<Zap className="w-5 h-5" />}
                  title="Real-time Feedback"
                  description="Get instant feedback on your answers"
                  gradient="from-pink-500 to-pink-600"
                />
                <FeatureCard
                  icon={<Award className="w-5 h-5" />}
                  title="Industry Questions"
                  description="Curated by senior engineers"
                  gradient="from-purple-500 to-pink-500"
                />
                <FeatureCard
                  icon={<Sparkles className="w-5 h-5" />}
                  title="Performance Analytics"
                  description="Track your progress over time"
                  gradient="from-pink-600 to-purple-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 group relative bg-gradient-to-r from-pink-600 to-pink-400 text-white font-semibold py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/25 disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Starting Interview...
                      </>
                    ) : (
                      <>
                        Start Interview
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <button
                  type="button"
                  className="px-8 py-4 border-2 border-pink-500/20 bg-black/50 text-white font-semibold rounded-xl hover:bg-pink-500/10 transition-all duration-300"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Indicator Component
const StepIndicator = ({ number, title, active, completed }) => (
  <div className="flex items-center">
    <div className="flex flex-col items-center">
      <div
        className={`
        flex items-center justify-center w-10 h-10 rounded-full font-semibold
        ${
          active
            ? "bg-gradient-to-r from-pink-600 to-pink-400 text-white"
            : completed
              ? "bg-green-500/20 text-green-500 border border-green-500/20"
              : "bg-gray-800 text-gray-400 border border-pink-500/20"
        }
      `}
      >
        {completed ? "✓" : number}
      </div>
      <span
        className={`text-xs mt-2 ${active ? "text-pink-500" : "text-gray-500"}`}
      >
        {title}
      </span>
    </div>
    {number < 3 && (
      <div className="w-24 h-0.5 mx-4 bg-gradient-to-r from-pink-500/20 to-transparent"></div>
    )}
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl border border-pink-500/20 p-4 hover:border-pink-500/40 transition-all duration-300">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}
    ></div>
    <div className="relative flex items-start gap-3">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center text-pink-500`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

export default JobDescription;
