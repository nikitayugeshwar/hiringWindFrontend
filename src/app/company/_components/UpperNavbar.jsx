"use client";
import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const UpperNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get current page title from pathname
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (!path || path === "company") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div
      className={`
        w-full sticky top-0 z-50 transition-all duration-300
        ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"}
      `}
    >
      {/* Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500" />

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Page Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-200">
                <span className="text-white font-bold text-xl">HW</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                  Hiring Wind
                </h1>
                <p className="text-xs text-gray-500">Company Panel</p>
              </div>
            </div>

            {/* Page Indicator */}
            <div className="hidden md:flex items-center gap-2 ml-8">
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 group"
              >
                <IoIosNotifications size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Notifications
                </div>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-600">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">
                        New job application
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        5 new candidates applied for Frontend Developer
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        2 minutes ago
                      </p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">
                        Interview scheduled
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Technical interview with John Doe at 3:00 PM
                      </p>
                      <p className="text-xs text-gray-400 mt-2">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 pr-4 hover:bg-teal-50 rounded-lg transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                  <CgProfile className="text-white" size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Company Name
                  </p>
                  <p className="text-xs text-gray-500">admin@company.com</p>
                </div>
                <FiChevronDown className="text-gray-400 group-hover:text-teal-500 transition-colors" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600">
                    <p className="text-white text-sm font-medium">
                      Quick Actions
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/company/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <CgProfile size={16} />
                      View Profile
                    </Link>
                    <Link
                      href="/company/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FiMenu size={16} />
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 my-2" />
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        // Handle logout
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiX size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperNavbar;
