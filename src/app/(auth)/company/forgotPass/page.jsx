"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [comapanyData, setCompanyData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/company/sendOtp`,
        comapanyData,
      );
      if (response.data.success) {
        alert(response.data.message);
        setIsVisible(false);
      }
    } catch (error) {
      console.log("error while sending otp", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Main Content */}
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            {/* Back to Login Link */}
            <div className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
              <a href="/company/login" className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to login
              </a>
            </div>

            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Remember your password?{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </a>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Enter your email address and we will send you a link to reset
                your password.
              </p>
            </div>

            {isVisible ? (
              <form className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="company@example.com"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send otp
                  </button>
                </div>
              </form>
            ) : (
              <form className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Otp
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    onClick={handleChange}
                    type="string"
                    //   autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="otp"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
