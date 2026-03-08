// student/jobs/_components/ApplyCard.js
"use client";
import axios from "axios";
import React, { useState } from "react";
import {
  X,
  Upload,
  User,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  FileText,
  AlertCircle,
} from "lucide-react";

const ApplyCard = ({ onClose, jobId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.includes("document"))
    ) {
      setResumeFile(file);
      setErrors((prev) => ({ ...prev, resume: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        resume: "Please upload a PDF or DOC file",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.currentSalary)
      newErrors.currentSalary = "Current salary is required";
    if (!formData.expectedSalary)
      newErrors.expectedSalary = "Expected salary is required";
    if (!formData.noticePeriod)
      newErrors.noticePeriod = "Notice period is required";
    if (!resumeFile) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (resumeFile) {
        data.append("resume", resumeFile);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/appliedJob/create/${jobId}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        // Show success message
        alert("Application submitted successfully!");
        onClose();
      }
    } catch (error) {
      console.log("error while job apply", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay with blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 shadow-2xl overflow-hidden">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-6 border-b border-pink-500/20">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold font-serif">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Apply for Position
                </span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Please provide accurate details for faster processing
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-pink-500 transition-colors rounded-lg hover:bg-pink-500/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
        >
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-pink-500" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  icon={<User className="w-4 h-4 text-pink-500" />}
                  error={errors.fullName}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  icon={<Mail className="w-4 h-4 text-pink-500" />}
                  error={errors.email}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  icon={<Phone className="w-4 h-4 text-pink-500" />}
                  error={errors.phone}
                />
              </div>
            </div>

            {/* Salary Details */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-pink-500" />
                Salary Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Current Salary"
                  name="currentSalary"
                  type="number"
                  value={formData.currentSalary}
                  onChange={handleChange}
                  placeholder="$50,000"
                  icon={<DollarSign className="w-4 h-4 text-pink-500" />}
                  error={errors.currentSalary}
                />

                <InputField
                  label="Expected Salary"
                  name="expectedSalary"
                  type="number"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  placeholder="$70,000"
                  icon={<DollarSign className="w-4 h-4 text-pink-500" />}
                  error={errors.expectedSalary}
                />

                <InputField
                  label="Notice Period"
                  name="noticePeriod"
                  type="number"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                  placeholder="30 days"
                  icon={<Calendar className="w-4 h-4 text-pink-500" />}
                  error={errors.noticePeriod}
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-pink-500" />
                Resume Upload
              </h3>

              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className={`
                    flex items-center justify-center gap-3 p-4
                    border-2 border-dashed rounded-xl
                    transition-all duration-300 cursor-pointer
                    ${
                      resumeFile
                        ? "border-pink-500 bg-pink-500/5"
                        : "border-pink-500/20 hover:border-pink-500/40 hover:bg-pink-500/5"
                    }
                  `}
                >
                  <Upload
                    className={`w-5 h-5 ${resumeFile ? "text-pink-500" : "text-gray-400"}`}
                  />
                  <span className="text-sm">
                    {resumeFile ? (
                      <span className="text-pink-500">{resumeFile.name}</span>
                    ) : (
                      <span className="text-gray-400">
                        Click to upload resume (PDF, DOC)
                      </span>
                    )}
                  </span>
                </label>
                {errors.resume && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.resume}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-4 rounded-xl font-semibold
                bg-gradient-to-r from-pink-600 to-pink-400
                text-white transition-all duration-300
                hover:from-pink-700 hover:to-pink-500
                hover:shadow-2xl hover:shadow-pink-500/25
                disabled:opacity-50 disabled:cursor-not-allowed
                relative overflow-hidden group
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-300">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full bg-black/50 border rounded-xl py-3 
          ${icon ? "pl-10" : "pl-4"} pr-4
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 transition-all
          ${
            error
              ? "border-red-500 focus:ring-red-500/20"
              : "border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
          }
        `}
      />
    </div>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

export default ApplyCard;
