"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [comapanyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companySize: "",
    industry: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/company/create`,
        comapanyData,
      );
      if (response.data.success) {
        alert(response.data.message);
        router.push("/company/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // 👈 this shows backend message
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Main Content */}
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your company account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  sign in to existing account
                </a>
              </p>
            </div>

            {/* Signup Form */}
            <form className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="company-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    id="company-name"
                    name="companyName"
                    onChange={handleChange}
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Acme Inc."
                  />
                </div>

                {/* Email */}
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

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label
                    htmlFor="company-size"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Size
                  </label>
                  <select
                    id="company-size"
                    name="companySize"
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </div>

                {/* Industry */}
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleSubmit}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </button>
              </div>
            </form>

            {/* Already have account (mobile) */}
            <div className="text-center sm:hidden">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
