"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Page = () => {
  const [userData, setUserData] = useState({
    name: "",
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
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/createUser`,
        userData,
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error while submiting the data", error);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl font-semibold">Sign up.</h1>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2 items-center border border-gray-200 py-2 px-10 rounded-2xl ">
          <FaGoogle color="white" size={15} />
          <h1>Continue with Google</h1>
        </div>
        <div className="flex flex-row gap-2 items-center border border-gray-200 py-2 px-10 rounded-2xl ">
          <FaFacebook color="white" size={15} />
          <h1>Continue with FaceBook</h1>
        </div>
      </div>
      <h1>Or</h1>

      <div className="flex flex-col gap-5">
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Name"
          className="py-2 px-2 border border-gray-200 rounded-2xl"
        />
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
      <button
        className="py-3 cursor-pointer px-20 bg-gradient-to-b from-pink-300 to-pink-600 rounded-2xl text-white"
        onClick={handleSubmit}
      >
        Create An Account
      </button>
      <h1 className="text-sm">
        Already have an account?{" "}
        <a href="login" className="underline">
          login
        </a>
      </h1>
    </div>
  );
};

export default Page;
