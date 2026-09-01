"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SideNavbar from "./_components/SideNavbar";
import UpperNavbar from "./_components/UpperNavbar";
import socket from "../../socket/socket.js";
import api from "@/utils/api";

export default function StudentLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await api.get(`/api/user/isAuthenticated`, {
          withCredentials: true,
        });

        if (response.data.success) {
          socket.emit("join", response.data.data);
          setCheckingAuth(false);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    };

    authenticate();
  }, [pathname, router]);

  if (checkingAuth) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <UpperNavbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <SideNavbar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
