import React from "react";

const Navbar = () => {
  return (
    <div className="h-auto w-full flex flex-row items-center justify-between px-10 py-5 bg-black text-white font-serif ">
      <h1 className="text-2xl font-bold font-serif">Hiring Wind</h1>
      <div className="">
        <ul className="flex flex-row gap-5">
          <li>Home </li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
