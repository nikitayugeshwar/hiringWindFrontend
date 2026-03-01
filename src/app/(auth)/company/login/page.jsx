"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [comapanyData, setCompanyData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/company/login`,
        comapanyData,
        { withCredentials: true },
      );
      // console.log("response", response);
      if (response.data.success) {
        router.push("/company");
        alert(response.data.message);
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
                Welcome back
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Dont have an account?{" "}
                <a
                  href="/company/signUp"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up for free
                </a>
              </p>
            </div>

            {/* Login Form */}
            <form className="mt-8 space-y-6">
              <div className="space-y-4">
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
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="/company/forgotPass"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                {/* Company Account Note */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        This login is for{" "}
                        <span className="font-semibold">
                          company accounts only
                        </span>
                        . Job seekers please use the candidate portal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleLogin}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in to your account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
