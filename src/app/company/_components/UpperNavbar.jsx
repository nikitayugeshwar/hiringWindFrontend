"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { FiMenu, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/utils/api";
import { useCompany } from "@/hooks/useCompany";
import { useClickOutside } from "@/hooks/useClickOutside";

const UpperNavbar = ({ onMenuClick = () => {} }) => {
  const { companyData } = useCompany();
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recent, setRecent] = useState([]);

  const closeProfile = useCallback(() => setShowProfileMenu(false), []);
  const closeNotifications = useCallback(() => setShowNotifications(false), []);

  const profileRef = useClickOutside(closeProfile, showProfileMenu);
  const notificationsRef = useClickOutside(
    closeNotifications,
    showNotifications,
  );

  // The bell surfaces the most recent applications rather than static copy.
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await api.get(`/api/company/dashboardStats`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setRecent(response.data.data.recentApplications || []);
        }
      } catch (error) {
        console.log("error while fetching recent applications", error);
      }
    };

    fetchRecent();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post(`/api/company/logout`, {}, { withCredentials: true });
      router.push("/company/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get current page title from pathname
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (!path || path === "company") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="w-full sticky top-0 z-30 bg-white shadow-sm">
      {/* Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Menu toggle, Logo and Page Title */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <FiMenu size={20} />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-200 shrink-0">
                <span className="text-white font-bold text-lg sm:text-xl">
                  HW
                </span>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent truncate">
                  Hiring Wind
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Company Panel
                </p>
              </div>
            </div>

            {/* Page Indicator */}
            <div className="hidden md:flex items-center gap-2 ml-4 lg:ml-8">
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="relative p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300"
                aria-label="Notifications"
              >
                <IoIosNotifications size={22} />
                {recent.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2rem))] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slideIn">
                  <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-600">
                    <h3 className="text-white font-semibold">
                      Recent Applications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-light">
                    {recent.length > 0 ? (
                      recent.map((item) => (
                        <div
                          key={item._id}
                          className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                          <p className="text-sm font-medium text-gray-800">
                            {item.fullName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Applied for {item.jobTitle}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString()
                              : ""}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="p-6 text-sm text-gray-500 text-center">
                        No applications yet
                      </p>
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <Link
                      href="/company/jobApplication"
                      onClick={closeNotifications}
                      className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                    >
                      View all applications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:pr-4 hover:bg-teal-50 rounded-lg transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md shrink-0">
                  <CgProfile className="text-white" size={18} />
                </div>
                <div className="hidden md:block text-left max-w-[12rem]">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {companyData?.companyName || "Company"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {companyData?.email || "Signed in"}
                  </p>
                </div>
                <FiChevronDown className="hidden sm:block text-gray-400 group-hover:text-teal-500 transition-colors" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slideIn">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600">
                    <p className="text-white text-sm font-medium truncate">
                      {companyData?.companyName || "Company"}
                    </p>
                    <p className="text-teal-100 text-xs truncate">
                      {companyData?.email || ""}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/company/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      onClick={closeProfile}
                    >
                      <FiUser size={16} />
                      Company Profile
                    </Link>
                    <Link
                      href="/company/job/addJob"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      onClick={closeProfile}
                    >
                      <FiMenu size={16} />
                      Post a Job
                    </Link>
                    <div className="border-t border-gray-100 my-2" />
                    <button
                      onClick={() => {
                        closeProfile();
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut size={16} />
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
