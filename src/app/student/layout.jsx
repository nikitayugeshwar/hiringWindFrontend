"use client";
import { useEffect } from "react";
import SideNavbar from "./_components/SideNavbar";
import UpperNavbar from "./_components/UpperNavbar";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RootLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/isAuthenticated`,
          { withCredentials: true },
        );

        if (response.data.success) {
          router.push("/student"); // ✅ logged in
        }
      } catch (error) {
        router.push("/login"); // ❌ not logged in
      }
    };

    authenticate();
  }, [router]);

  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col">
          {/* Sticky Upper Navbar */}
          <UpperNavbar />

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden">
            <SideNavbar />

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
