"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SideNavbar from "./_components/SideNavbar";
import UpperNavbar from "./_components/UpperNavbar";
import api from "@/utils/api";

export default function CompanyLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const companyAuthenticate = async () => {
      try {
        const response = await api.get(`/api/company/companyAuthticated`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setCheckingAuth(false);
        } else {
          router.push("/company/login");
        }
      } catch (error) {
        router.push("/company/login");
      }
    };
    companyAuthenticate();
  }, [pathName, router]);

  if (checkingAuth) {
    return (
      <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading your panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <UpperNavbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <SideNavbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto scrollbar-light p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
