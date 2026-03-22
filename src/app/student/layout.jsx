"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import SideNavbar from "./_components/SideNavbar";
import UpperNavbar from "./_components/UpperNavbar";
import socket from "../../socket/socket.js";
import api from "@/utils/api";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await api.get(`/api/user/isAuthenticated`, {
          withCredentials: true,
        });

        if (response.data.success) {
          socket.emit("join", response.data.data);
          // ✅ Only redirect if user is on login page
          if (pathname === "/login") {
            router.push("/student");
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    };

    authenticate();
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col">
          <UpperNavbar />
          <div className="flex flex-1 overflow-hidden">
            <SideNavbar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
