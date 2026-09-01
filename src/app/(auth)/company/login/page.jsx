"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiAlertCircle,
  FiInfo,
} from "react-icons/fi";
import api from "@/utils/api";

export default function LoginPage() {
  const [comapanyData, setCompanyData] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post(`/api/company/login`, comapanyData, {
        withCredentials: true,
      });

      if (response.data.success) {
        router.push("/company");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not sign you in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
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
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/company/signUp"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div className="group">
              <label
                htmlFor="email-address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  id="email-address"
                  name="email"
                  value={comapanyData.email}
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                  placeholder="company@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  id="password"
                  name="password"
                  value={comapanyData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                href="/company/forgotPass"
                className="text-sm font-medium text-teal-600 hover:text-teal-500"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Company Account Note */}
            <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-xl">
              <div className="flex gap-3">
                <FiInfo className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-teal-800">
                  This login is for{" "}
                  <span className="font-semibold">company accounts only</span>.
                  Job seekers should use the{" "}
                  <Link href="/login" className="underline font-medium">
                    candidate portal
                  </Link>
                  .
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <FiAlertCircle className="text-red-500 text-lg shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FiLogIn size={18} />
                  <span>Sign in to your account</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
