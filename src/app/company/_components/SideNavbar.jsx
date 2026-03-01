import React from "react";

const SideNavbar = () => {
  return (
    <div className="h-full flex flex-col justify-between w-56 bg-black   text-white">
      <div className="flex flex-col gap-5  text-xl p-5">
        <ul>
          <li>Dashboards</li>
          <li>Jobs</li>
          <li>job Request</li>
          <li>Interviews</li>
        </ul>
      </div>
      Logout
    </div>
  );
};

export default SideNavbar;
