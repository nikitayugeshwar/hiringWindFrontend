"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
        return "";
      case "password":
        if (!value) return "Password is required";
        // Password validation removed - only checking if not empty
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, userData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(userData).forEach((key) => {
      const error = validateField(key, userData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
    });

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/createUser`,
        userData,
      );
      if (response.data.success) {
        // Show success message
        alert(response.data.message);
        // Reset form
        setUserData({ name: "", email: "", password: "" });

        setTouched({});
        router.push("/login");
      }
    } catch (error) {
      console.log("error while submitting the data", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">Join our community today</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500 group">
              <FaGoogle
                className="text-gray-300 group-hover:text-white"
                size={18}
              />
              <span className="text-sm text-gray-300 group-hover:text-white">
                Google
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500 group">
              <FaFacebook
                className="text-gray-300 group-hover:text-white"
                size={18}
              />
              <span className="text-sm text-gray-300 group-hover:text-white">
                Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-800 text-gray-400 rounded-lg">
                or
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-sm text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <FiUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full py-3 pl-10 pr-3 bg-gray-700/30 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-200 placeholder-gray-500 ${
                    touched.name && errors.name
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-gray-600 focus:ring-pink-500/20 focus:border-pink-500"
                  }`}
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-sm text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full py-3 pl-10 pr-3 bg-gray-700/30 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-200 placeholder-gray-500 ${
                    touched.email && errors.email
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-gray-600 focus:ring-pink-500/20 focus:border-pink-500"
                  }`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-sm text-gray-400 ml-1">Password</label>
              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full py-3 pl-10 pr-10 bg-gray-700/30 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-200 placeholder-gray-500 ${
                    touched.password && errors.password
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-gray-600 focus:ring-pink-500/20 focus:border-pink-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password}
                </p>
              )}
              {/* Password strength indicator removed */}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                <p className="text-red-500 text-sm text-center">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-pink-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 text-gray-600 text-xs">
          By signing up, you agree to our{" "}
          <a
            href="/terms"
            className="text-gray-500 hover:text-gray-400 underline"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-gray-500 hover:text-gray-400 underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
