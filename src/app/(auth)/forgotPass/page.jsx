"use client";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!userData.email) {
      alert("pahle email bhai BSDK");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/sendOtp`,
        { email: userData.email },
      );
      console.log("response", response);
      if (response.data.success) {
        alert(response.data.message);
        setIsVisible(false); // Show OTP form
      }
    } catch (error) {
      console.log("error while sending otp frontend", error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/resetPassword`,
        { otp: userData.otp, password: userData.password },
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error while reset password", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white bg-black">
      {isVisible ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl font-semibold mb-2">
            Forgot Password
          </h1>

          <form className="h-auto w-96 border border-gray-400 rounded-2xl flex flex-col gap-3 p-5">
            <div className="flex flex-col gap-1">
              <h1>Email</h1>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Enter Your Email"
                className="py-2 px-5 border border-gray-400 rounded-2xl text-white outline-none"
              />
            </div>

            <button
              type="button"
              className="px-3 py-1 text-black bg-white rounded-2xl mt-10 cursor-pointer"
              onClick={handleSendOtp}
            >
              Send Otp
            </button>
          </form>
        </div>
      ) : (
        <form className="h-auto w-96 border border-gray-400 rounded-2xl flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <h1>Otp</h1>
            <input
              name="otp"
              onChange={handleChange}
              type="text"
              placeholder="Enter otp..."
              className="py-2 px-5 border border-gray-400 rounded-2xl text-white outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <h1>New Password</h1>

            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter Your password"
              className="py-2 px-5 border border-gray-400 rounded-2xl text-white outline-none"
            />
          </div>

          <button
            className="px-3 py-1 text-black bg-white rounded-2xl mt-10 cursor-pointer"
            onClick={handleResetPassword}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
