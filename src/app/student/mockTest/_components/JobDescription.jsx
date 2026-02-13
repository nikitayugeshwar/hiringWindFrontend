import React, { useState } from "react";
import {
  FiCode,
  FiBriefcase,
  FiFileText,
  FiArrowRight,
  FiAward,
} from "react-icons/fi";
import { BsLightningCharge, BsShieldCheck } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import axios from "axios";

const JobDescription = ({ setStepCount, questionIdSetKar }) => {
  const [formData, setFormData] = useState({
    technology: "",
    experience: "",
    questionsNumber: "",
  });

  const [errors, setErrors] = useState({});

  const technologies = [
    { value: "react", label: "React.js", level: "Advanced", icon: "⚛️" },
    { value: "javascript", label: "JavaScript", level: "Expert", icon: "📜" },
    { value: "nodejs", label: "Node.js", level: "Advanced", icon: "🟢" },
    {
      value: "express",
      label: "Express.js",
      level: "Intermediate",
      icon: "🚂",
    },
    { value: "mongodb", label: "MongoDB", level: "Intermediate", icon: "🍃" },
    { value: "java", label: "Java", level: "Expert", icon: "☕" },
    { value: "python", label: "Python", level: "Advanced", icon: "🐍" },
    { value: "typescript", label: "TypeScript", level: "Advanced", icon: "📘" },
    { value: "nextjs", label: "Next.js", level: "Advanced", icon: "▲" },
  ];

  const experienceLevels = [
    { value: "0-1", label: "0-1 years", level: "Entry Level" },
    { value: "1-3", label: "1-3 years", level: "Junior" },
    { value: "3-5", label: "3-5 years", level: "Mid-Level" },
    { value: "5-8", label: "5-8 years", level: "Senior" },
    { value: "8+", label: "8+ years", level: "Lead/Architect" },
  ];

  const questionCounts = [
    { value: "5", label: "5 questions", duration: "~15 mins" },
    { value: "10", label: "10 questions", duration: "~30 mins" },
    { value: "15", label: "15 questions", duration: "~45 mins" },
    { value: "20", label: "20 questions", duration: "~60 mins" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
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
      newErrors.experience = "Please select years of experience";
    if (!formData.questionsNumber)
      newErrors.questionsNumber = "Please select number of questions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validateForm();
    if (!validate) {
      alert("pahle details bhar bsdk");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/interview/create`,
        formData,
      );
      if (response.data.success) {
        alert(response.data.message);
        setStepCount(2);
        questionIdSetKar(response.data.data._id);
      }
    } catch (error) {
      console.log("error while submit the data", error);
    }
  };

  const getSelectedTechnology = () => {
    return technologies.find((t) => t.value === formData.technology);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <BsLightningCharge className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent mb-4">
            Practice Your Way to Success
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Customize your interview experience and get real-time feedback to
            ace your next tech interview
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Progress Steps */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-semibold">
                  1
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Step 1</p>
                  <p className="text-sm font-semibold text-gray-900">
                    Configure Interview
                  </p>
                </div>
              </div>
              <div className="flex-1 mx-4 h-0.5 bg-gray-300">
                <div className="w-0 h-full bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-600 rounded-full font-semibold">
                  2
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Step 2</p>
                  <p className="text-sm font-semibold text-gray-400">
                    Start Interview
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10">
            <form className="space-y-8">
              {/* Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Technology Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="flex items-center gap-2">
                      <FiCode className="text-blue-500" />
                      Technology Stack
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      name="technology"
                      value={formData.technology}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl appearance-none focus:outline-none focus:ring-4 transition-all ${
                        errors.technology
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">Select Technology</option>
                      {technologies.map((tech) => (
                        <option key={tech.value} value={tech.value}>
                          {tech.icon} {tech.label} • {tech.level}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.technology && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.technology}
                    </p>
                  )}
                </div>

                {/* Experience Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="flex items-center gap-2">
                      <FiBriefcase className="text-blue-500" />
                      Experience Level
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl appearance-none focus:outline-none focus:ring-4 transition-all ${
                        errors.experience
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">Select Experience</option>
                      {experienceLevels.map((exp) => (
                        <option key={exp.value} value={exp.value}>
                          {exp.label} • {exp.level}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.experience && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Questions Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="flex items-center gap-2">
                      <FiFileText className="text-blue-500" />
                      Number of Questions
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      name="questionsNumber"
                      value={formData.questionsNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl appearance-none focus:outline-none focus:ring-4 transition-all ${
                        errors.questions
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">Select Questions</option>
                      {questionCounts.map((q) => (
                        <option key={q.value} value={q.value}>
                          {q.label} • {q.duration}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.questions && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.questions}
                    </p>
                  )}
                </div>
              </div>

              {/* Selected Configuration Summary */}
              {formData.technology &&
                formData.experience &&
                formData.questions && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                          <BsShieldCheck className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Interview Configuration Ready
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">Technology:</span>
                            <span className="bg-white px-2 py-1 rounded-md border border-gray-200">
                              {getSelectedTechnology()?.icon}{" "}
                              {getSelectedTechnology()?.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">Experience:</span>
                            <span className="bg-white px-2 py-1 rounded-md border border-gray-200">
                              {
                                experienceLevels.find(
                                  (e) => e.value === formData.experience,
                                )?.label
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">Questions:</span>
                            <span className="bg-white px-2 py-1 rounded-md border border-gray-200">
                              {
                                questionCounts.find(
                                  (q) => q.value === formData.questions,
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
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BsLightningCharge className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Real-time Feedback
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Get instant feedback on your answers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MdOutlineWorkOutline className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Industry Questions
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Curated by senior engineers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <FiAward className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Performance Analytics
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Track your progress over time
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Start Interview</span>
                  <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  className="px-8 py-4 border-2 border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
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

export default JobDescription;
