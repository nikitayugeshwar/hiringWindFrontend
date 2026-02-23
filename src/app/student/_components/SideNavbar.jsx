"use client";
import { Red_Rose } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SideNavbar = () => {
  const navitems = [
    { name: "Dashboard", href: "/student" },
    { name: "Mock Test", href: "/student/mockTest" },
    { name: "Reports", href: "/student/reports" },
    { name: "Profile", href: "/student/profile" },
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
    <div className="h-full flex flex-col justify-between w-56 bg-black   text-white">
      <div className="flex flex-col gap-5  text-xl p-5">
        {navitems.map((item, index) => {
          const isActive = pathName === item.href;
          return (
            <>
              <Link
                key={index}
                href={item.href}
                className={` transition-all duration-300 ${isActive ? "text-black bg-white" : "hover:text-black hover:bg-white "} px-5 rounded-2xl py-2`}
              >
                {item.name}
              </Link>
            </>
          );
        })}
      </div>
      <button onClick={handleLogout} className="pl-5">
        Logout
      </button>
    </div>
  );
};

export default SideNavbar;
