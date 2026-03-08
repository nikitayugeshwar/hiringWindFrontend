// student/_components/SideNavbar.js
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  Briefcase,
  LogOut,
  Sparkles,
} from "lucide-react";

const SideNavbar = () => {
  const navitems = [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "Mock Test", href: "/student/mockTest", icon: FileText },
    { name: "Reports", href: "/student/reports", icon: BarChart3 },
    { name: "Profile", href: "/student/profile", icon: User },
    { name: "Jobs", href: "/student/jobs", icon: Briefcase },
  ];

  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/logout`,
        {},
        { withCredentials: true },
      );
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between w-64 bg-gradient-to-b from-black to-gray-900 text-white border-r border-pink-500/20">
      {/* Logo Section */}
      <div>
        <div className="p-6 border-b border-pink-500/20">
          <Link href="/student" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Student Portal
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2 p-4">
          {navitems.map((item) => {
            const Icon = item.icon;
            const isActive = pathName === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group relative flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 overflow-hidden
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-pink-600 to-purple-600"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                {/* Background Hover Effect */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}

                {/* Icon */}
                <Icon
                  className={`w-5 h-5 relative z-10 ${isActive ? "text-white" : "group-hover:text-pink-500"}`}
                />

                {/* Label */}
                <span className="relative z-10 font-medium">{item.name}</span>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-8 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-pink-500/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-600/10 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
