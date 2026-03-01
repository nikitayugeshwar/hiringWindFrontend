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
        alert(error.response.data.message);
        router.push("/company/login");
      }
    };
    companyAuthenticate();
  }, [pathName]);

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
