import SideNavbar from "./_components/SideNavbar";
import UpperNavbar from "./_components/UpperNavbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div className="h-screen flex flex-col">
          <UpperNavbar />
          <div className="h-full flex flex-row">
            <SideNavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
