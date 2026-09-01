"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Bell, User, ChevronDown, Sparkles, Menu, LogOut } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useClickOutside } from "@/hooks/useClickOutside";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import socket from "../../../socket/socket.js";

const UpperNavbar = ({ onMenuClick = () => {} }) => {
  const { userData } = useUser();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const closeProfile = useCallback(() => setShowProfileMenu(false), []);
  const closeNotifications = useCallback(() => setShowNotifications(false), []);

  const profileRef = useClickOutside(closeProfile, showProfileMenu);
  const notificationsRef = useClickOutside(
    closeNotifications,
    showNotifications,
  );

  // Status changes pushed by the company panel arrive over the socket room the
  // layout joined after authenticating.
  useEffect(() => {
    const handleJobStatus = (data) => {
      setNotifications((prev) => [
        {
          id: `${Date.now()}-${Math.random()}`,
          title: data.jobTitle || "Application update",
          description: data.message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev,
      ]);
      setUnread((prev) => prev + 1);
    };

    socket.on("jobStatus", handleJobStatus);

    return () => {
      socket.off("jobStatus", handleJobStatus);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await api.post(`/api/user/logout`, {}, { withCredentials: true });
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black w-full sticky top-0 z-30 border-b border-pink-500/20">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Left side - Menu toggle + Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-pink-500 rounded-lg hover:bg-pink-500/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold truncate">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hiring Wind
              </span>
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setShowNotifications((prev) => !prev);
                  setUnread(0);
                }}
                className="relative p-2 text-gray-400 hover:text-pink-500 transition-colors rounded-lg hover:bg-pink-500/10"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unread > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-pink-500 rounded-full">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2rem))] bg-gray-900 rounded-xl border border-pink-500/20 shadow-2xl overflow-hidden animate-slideIn">
                  <div className="p-4 border-b border-pink-500/20">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <NotificationItem
                          key={item.id}
                          title={item.title}
                          description={item.description}
                          time={item.time}
                        />
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <Bell className="w-8 h-8 text-pink-500/30 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          No notifications yet
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Updates on your applications will show up here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-pink-500/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shrink-0">
                  {userData?.name ? (
                    <span className="text-sm font-semibold text-white">
                      {userData.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="hidden md:block text-left max-w-[12rem]">
                  <p className="text-sm font-medium text-white truncate">
                    {userData?.name || "Student"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {userData?.email || "Signed in"}
                  </p>
                </div>
                <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-pink-500" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-900 rounded-xl border border-pink-500/20 shadow-2xl overflow-hidden animate-slideIn">
                  <div className="px-4 py-3 border-b border-pink-500/20 md:hidden">
                    <p className="text-sm font-medium text-white truncate">
                      {userData?.name || "Student"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {userData?.email || "Signed in"}
                    </p>
                  </div>
                  <Link
                    href="/student/profile"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-pink-500/10 hover:text-white transition-colors"
                    onClick={closeProfile}
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/student/reports"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-pink-500/10 hover:text-white transition-colors"
                    onClick={closeProfile}
                  >
                    My Reports
                  </Link>
                  <hr className="border-pink-500/20" />
                  <button
                    className="w-full flex items-center gap-2 text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => {
                      closeProfile();
                      handleLogout();
                    }}
                  >
                    <LogOut className="w-4 h-4" />
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
