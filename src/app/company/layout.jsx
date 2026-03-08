"use client";
import { useEffect } from "react";
import axios from "axios";
import SideNavbar from "./_components/SideNavbar";
import UpperNavbar from "./_components/UpperNavbar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const companyAuthenticate = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/company/companyAuthticated`,
          { withCredentials: true },
        );
        if (response.data.success) {
          if (pathName === "/company/login") {
            router.push("/company");
          }
        } else {
          router.push("/company/login");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Authentication failed");
        router.push("/company/login");
      }
    };
    companyAuthenticate();
  }, [pathName, router]);

  return (
    <html lang="en">
      <body className="overflow-hidden">
        <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
          <UpperNavbar />
          <div className="flex flex-1 overflow-hidden">
            <SideNavbar />
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
