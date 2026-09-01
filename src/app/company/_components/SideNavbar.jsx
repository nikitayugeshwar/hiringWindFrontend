"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  FiHome,
  FiBriefcase,
  FiVideo,
  FiUser,
  FiFileText,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import api from "@/utils/api";

const navitems = [
  { name: "Dashboard", href: "/company", icon: FiHome },
  { name: "Jobs", href: "/company/job", icon: FiBriefcase },
  { name: "Applications", href: "/company/jobApplication", icon: FiFileText },
  { name: "Interviews", href: "/company/interview", icon: FiVideo },
  { name: "Profile", href: "/company/profile", icon: FiUser },
];

const SideNavbar = ({ isOpen = false, onClose = () => {} }) => {
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
    <>
      {/* Backdrop — mobile only, sits under the drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden animate-fadeIn"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          h-full w-72 shrink-0
          flex flex-col justify-between
          bg-white shadow-2xl overflow-hidden
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-gray-50 opacity-50 pointer-events-none" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-black to-gray-800 rounded-full filter blur-3xl opacity-10 pointer-events-none" />

        {/* Navigation Items */}
        <div className="relative z-10 flex flex-col gap-2 p-6 min-h-0">
          <div className="mb-8 px-4 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                Menu
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full mt-2" />
            </div>

            {/* Close button — mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-400 hover:text-teal-600 transition-colors"
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 overflow-y-auto scrollbar-light">
            {navitems.map((item) => {
              const isActive = pathName === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
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
                    className={`text-xl shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-teal-500"}`}
                  />
                  <span className="font-medium">{item.name}</span>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </nav>
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
      </aside>
    </>
  );
};

export default SideNavbar;
