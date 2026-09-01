// student/_components/SideNavbar.js
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  Briefcase,
  ClipboardList,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import api from "@/utils/api";

const navitems = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Mock Test", href: "/student/mockTest", icon: FileText },
  { name: "Reports", href: "/student/reports", icon: BarChart3 },
  { name: "Jobs", href: "/student/jobs", icon: Briefcase },
  { name: "Applied Jobs", href: "/student/appliedJobs", icon: ClipboardList },
  { name: "Profile", href: "/student/profile", icon: User },
];

const SideNavbar = ({ isOpen = false, onClose = () => {} }) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post(`/api/user/logout`, {}, { withCredentials: true });
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <>
      {/* Backdrop — mobile only, sits under the drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-fadeIn"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          h-full w-64 shrink-0
          flex flex-col justify-between
          bg-gradient-to-b from-black to-gray-900 text-white
          border-r border-pink-500/20
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="min-h-0 flex flex-col">
          <div className="p-6 border-b border-pink-500/20 flex items-center justify-between">
            <Link href="/student" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Student Portal
              </span>
            </Link>

            {/* Close button — mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2 p-4 overflow-y-auto custom-scrollbar">
            {navitems.map((item) => {
              const Icon = item.icon;
              const isActive = pathName === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
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
                    className={`w-5 h-5 relative z-10 shrink-0 ${isActive ? "text-white" : "group-hover:text-pink-500"}`}
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
          </nav>
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
      </aside>
    </>
  );
};

export default SideNavbar;
