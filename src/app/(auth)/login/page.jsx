"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/login`,
        userData,
        { withCredentials: true },
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error while lohin", error);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl font-semibold">Login.</h1>

      <div className="flex flex-col gap-5">
        <input
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="Email"
          className="py-2 px-2 border border-gray-200 rounded-2xl"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="password"
          className="py-2 px-15 border border-gray-200 rounded-2xl"
        />
      </div>

      <div className="flex flex-row items-center justify-between">
        <a href="/forgotPass" className="text-white">
          Forgot password
        </a>
        <h1 className="text-white text-right text-sm pl-20">
          New User?
          <a href="/signup">Sign Up</a>
        </h1>
      </div>
      <button
        className="py-3 cursor-pointer px-32 bg-gradient-to-b from-pink-300 to-pink-600 rounded-2xl text-white"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
};

export default Page;
