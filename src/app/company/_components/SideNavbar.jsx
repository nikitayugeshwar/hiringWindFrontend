"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import {
  FiHome,
  FiBriefcase,
  FiVideo,
  FiUser,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import api from "@/utils/api";

const SideNavbar = () => {
  const navitems = [
    { name: "Dashboard", href: "/company", icon: FiHome },
    { name: "Jobs", href: "/company/job", icon: FiBriefcase },
    { name: "Interviews", href: "/company/interview", icon: FiVideo },
    { name: "Applications", href: "/company/jobApplication", icon: FiFileText },
    { name: "Profile", href: "/company/profile", icon: FiUser },
  ];

  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post(`/api/company/logout`, {}, { withCredentials: true });
      router.push("/company/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between w-72 bg-white shadow-2xl relative overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-gray-50 opacity-50" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-black to-gray-800 rounded-full filter blur-3xl opacity-10" />

      {/* Navigation Items */}
      <div className="relative z-10 flex flex-col gap-2 p-6">
        <div className="mb-8 px-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
            Menu
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full mt-2" />
        </div>

        {navitems.map((item, index) => {
          const isActive = pathName === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300 relative overflow-hidden
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg shadow-teal-200"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }
              `}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full" />
              )}

              <Icon
                className={`text-xl ${isActive ? "text-white" : "text-gray-400 group-hover:text-teal-500"}`}
              />
              <span className="font-medium">{item.name}</span>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="relative z-10 p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 group relative overflow-hidden"
        >
          <FiLogOut className="text-xl group-hover:text-white transition-colors" />
          <span className="font-medium">Logout</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
