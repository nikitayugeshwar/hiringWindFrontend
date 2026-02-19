import SideNavbar from "./_components/SideNavbar";
import UpperNavbar from "./_components/UpperNavbar";

export default function RootLayout({ children }) {
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
