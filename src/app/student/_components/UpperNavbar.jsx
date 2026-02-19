import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";

const UpperNavbar = () => {
  return (
    <div className="bg-black w-full sticky top-0 z-50 flex flex-row text-white items-center justify-between px-10 py-5">
      <h1>Hiring Wind</h1>
      <div className="flex flex-row gap-5">
        <button>
          <IoIosNotifications size={20} />
        </button>
        <button>
          <CgProfile size={20} />
        </button>
      </div>
    </div>
  );
};

export default UpperNavbar;
