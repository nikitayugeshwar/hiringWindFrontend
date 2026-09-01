"use client";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import api from "@/utils/api";

const emptyProfile = {
  companyName: "",
  companySize: "",
  industry: "",
  website: "",
  location: "",
  phone: "",
  about: "",
};

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const Page = () => {
  const [formData, setFormData] = useState(emptyProfile);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/company/getCompany`, {
          withCredentials: true,
        });

        if (response.data.success) {
          const data = response.data.data || {};
          setEmail(data.email || "");
          setFormData({
            ...emptyProfile,
            ...Object.fromEntries(
              Object.keys(emptyProfile).map((key) => [key, data[key] ?? ""]),
            ),
          });
        }
      } catch (error) {
        console.log("error while fetching the company", error);
        setFeedback({ type: "error", message: "Could not load your profile" });
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const response = await api.put(`/api/company/updateCompany`, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        setFeedback({ type: "success", message: "Profile saved" });
      }
    } catch (error) {
      console.log("error while updating the company", error);
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Could not save your profile",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-4">Loading company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-6 sm:p-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 flex items-center justify-center text-3xl font-bold text-white shrink-0">
            {formData.companyName?.charAt(0).toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white break-words">
              {formData.companyName || "Your company"}
            </h1>
            <p className="text-teal-100 mt-1 break-all">{email}</p>
            {formData.industry && (
              <span className="inline-block mt-3 px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-sm text-white">
                {formData.industry}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100 space-y-6"
      >
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiBriefcase className="text-teal-500" />
            Company Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Tech Corp Inc."
              icon={<FiUser />}
              required
            />

            <Field
              label="Email Address"
              name="email"
              value={email}
              onChange={() => {}}
              placeholder="company@example.com"
              icon={<FiMail />}
              disabled
              hint="Email is used to sign in and cannot be changed here"
            />

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Size
              </label>
              <div className="relative">
                <FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none appearance-none bg-white transition-all duration-300"
                >
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Field
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Information Technology"
              icon={<FiBriefcase />}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiMapPin className="text-teal-500" />
            Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Bengaluru, India"
              icon={<FiMapPin />}
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              icon={<FiPhone />}
            />
            <div className="md:col-span-2">
              <Field
                label="Website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                icon={<FiGlobe />}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiFileText className="text-teal-500" />
            About
          </h2>

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Description
            </label>
            <div className="relative">
              <FiFileText className="absolute left-4 top-4 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              <textarea
                name="about"
                rows="5"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell candidates what your company does and what it is like to work there..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300 resize-none"
              ></textarea>
            </div>
          </div>
        </section>

        {feedback && (
          <div
            className={`
              flex items-center gap-3 p-4 rounded-xl border
              ${
                feedback.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }
            `}
          >
            {feedback.type === "success" ? (
              <FiCheckCircle className="text-lg shrink-0" />
            ) : (
              <FiAlertCircle className="text-lg shrink-0" />
            )}
            <p>{feedback.message}</p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiSave />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  hint,
  required = false,
  disabled = false,
}) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
      />
    </div>
    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
  </div>
);

export default Page;
