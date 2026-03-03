"use client";
import axios from "axios";
import React, { useState } from "react";

const ApplyCard = ({ onClose, jobId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    resumeUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/appliedJob/create/${jobId}`,
        formData,
        { withCredentials: true },
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error while job apply", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Apply for this Position
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Please provide accurate details for faster processing.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="mt-8 flex flex-col gap-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="fullName"
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="input-style"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="john@example.com"
                className="input-style"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                name="phone"
                onChange={handleChange}
                type="tel"
                placeholder="+1 234 567 890"
                className="input-style"
              />
            </div>
          </div>

          {/* Salary Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Salary Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Current Salary
                </label>
                <input
                  name="currentSalary"
                  onChange={handleChange}
                  type="number"
                  placeholder="$50,000"
                  className="input-style"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Expected Salary
                </label>
                <input
                  name="expectedSalary"
                  onChange={handleChange}
                  type="number"
                  placeholder="$70,000"
                  className="input-style"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Notice Period (Days)
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="noticePeriod"
                  placeholder="30"
                  className="input-style"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Upload Resume
            </label>
            <input
              name="resumeUrl"
              onChange={handleChange}
              type="text"
              placeholder="enter resume "
              className="input-style"
            />
            {/* <input
            name="resumeUrl"
              type="file"
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-black file:text-white hover:file:bg-gray-800 transition"
            /> */}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyCard;
