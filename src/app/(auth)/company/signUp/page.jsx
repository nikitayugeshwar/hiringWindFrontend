"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUsers,
  FiBriefcase,
  FiUserPlus,
  FiAlertCircle,
} from "react-icons/fi";
import api from "@/utils/api";

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

export default function SignupPage() {
  const [comapanyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companySize: "",
    industry: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comapanyData.password !== comapanyData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/api/company/create`, comapanyData);
      if (response.data.success) {
        router.push("/company/login");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        {/* Brand */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-200">
            <span className="text-white font-bold text-xl">HW</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
            Hiring Wind
          </span>
        </Link>

        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="mb-8">
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              Create your company account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/company/login"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Field
              label="Company Name"
              name="companyName"
              value={comapanyData.companyName}
              onChange={handleChange}
              placeholder="Tech Corp Inc."
              icon={<FiUser />}
              required
            />

            <Field
              label="Email address"
              name="email"
              type="email"
              value={comapanyData.email}
              onChange={handleChange}
              placeholder="company@example.com"
              icon={<FiMail />}
              autoComplete="email"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    name="password"
                    value={comapanyData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Field
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={comapanyData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<FiLock />}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Size
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <select
                    name="companySize"
                    value={comapanyData.companySize}
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
                value={comapanyData.industry}
                onChange={handleChange}
                placeholder="Information Technology"
                icon={<FiBriefcase />}
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <FiAlertCircle className="text-red-500 text-lg shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <FiUserPlus size={18} />
                  <span>Create account</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
  required = false,
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
        autoComplete={autoComplete}
        required={required}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
      />
    </div>
  </div>
);
