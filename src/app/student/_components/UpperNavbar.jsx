"use client";
import React, { useEffect, useState } from "react";
import { Bell, User, ChevronDown, Sparkles } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import socket from "../../../socket/socket.js";

const UpperNavbar = () => {
  const { userData } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleJobStatus = (data) => {
      alert(data.message);
    };

    socket.on("jobStatus", handleJobStatus);

    return () => {
      socket.off("jobStatus", handleJobStatus);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black w-full sticky top-0 z-50 border-b border-pink-500/20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Brand */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hiring Wind
              </span>
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-pink-500 transition-colors rounded-lg hover:bg-pink-500/10"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-xl border border-pink-500/20 shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-pink-500/20">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <NotificationItem
                      title="New Mock Test Available"
                      description="React Advanced interview ready"
                      time="5 min ago"
                    />
                    <NotificationItem
                      title="Interview Feedback"
                      description="Your JavaScript report is ready"
                      time="1 hour ago"
                    />
                    <NotificationItem
                      title="Job Match Found"
                      description="3 new jobs matching your profile"
                      time="2 hours ago"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-500/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">
                    {userData?.name || "Student"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {userData?.email || "student@example.com"}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-pink-500" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-xl border border-pink-500/20 shadow-2xl overflow-hidden">
                  <Link
                    href="/student/profile"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-pink-500/10 hover:text-white transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/student/settings"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-pink-500/10 hover:text-white transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Settings
                  </Link>
                  <hr className="border-pink-500/20" />
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Handle logout
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NotificationItem = ({ title, description, time }) => (
  <div className="p-4 hover:bg-pink-500/5 transition-colors cursor-pointer border-b border-pink-500/10 last:border-0">
    <p className="text-sm font-medium text-white">{title}</p>
    <p className="text-xs text-gray-400 mt-1">{description}</p>
    <p className="text-xs text-pink-500 mt-2">{time}</p>
  </div>
);

export default UpperNavbar;
