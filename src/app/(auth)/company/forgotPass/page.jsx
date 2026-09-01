"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiHash,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import api from "@/utils/api";

const Page = () => {
  const [comapanyData, setCompanyData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFeedback(null);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post(`/api/company/sendOtp`, {
        email: comapanyData.email,
      });
      if (response.data.success) {
        setOtpSent(true);
        setFeedback({
          type: "success",
          message: "We sent a 6-digit code to your email",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Could not send the code",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post(
        `/api/company/resetPassword`,
        comapanyData,
      );
      if (response.data.success) {
        router.push("/company/login");
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message || "Could not reset your password",
      });
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
          {/* Back to Login Link */}
          <Link
            href="/company/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors mb-6"
          >
            <FiArrowLeft />
            Back to login
          </Link>

          <div className="mb-6">
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              {otpSent ? "Set a new password" : "Forgot your password?"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {otpSent
                ? "Enter the code we emailed you along with your new password"
                : "Enter your email address and we will send you a code to reset your password"}
            </p>
          </div>

          {feedback && (
            <div
              className={`
                flex items-center gap-3 p-4 rounded-xl border mb-5
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
              <p className="text-sm">{feedback.message}</p>
            </div>
          )}

          {!otpSent ? (
            <form className="space-y-5" onSubmit={handleSendOtp}>
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

              <SubmitButton
                loading={loading}
                idleLabel="Send code"
                loadingLabel="Sending..."
                icon={<FiSend size={18} />}
              />
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleResetPassword}>
              <Field
                label="Verification code"
                name="otp"
                value={comapanyData.otp}
                onChange={handleChange}
                placeholder="6-digit code"
                icon={<FiHash />}
                inputMode="numeric"
                required
              />

              <Field
                label="New password"
                name="password"
                type="password"
                value={comapanyData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<FiLock />}
                autoComplete="new-password"
                required
              />

              <SubmitButton
                loading={loading}
                idleLabel="Reset password"
                loadingLabel="Resetting..."
                icon={<FiLock size={18} />}
              />

              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setFeedback(null);
                }}
                className="w-full text-sm text-gray-600 hover:text-teal-600 transition-colors"
              >
                Use a different email
              </button>
            </form>
          )}
        </div>
      </div>
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
  autoComplete,
  inputMode,
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
        inputMode={inputMode}
        required={required}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
      />
    </div>
  </div>
);

const SubmitButton = ({ loading, idleLabel, loadingLabel, icon }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        <span>{loadingLabel}</span>
      </>
    ) : (
      <>
        {icon}
        <span>{idleLabel}</span>
      </>
    )}
  </button>
);

export default Page;
