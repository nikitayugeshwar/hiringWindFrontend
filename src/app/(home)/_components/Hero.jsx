import React from "react";
import Image from "next/image";
import prep from "../_components/prep.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-black text-white w-full h-screen flex flex-row gap-5 px-10">
      <div className=" flex flex-col gap-5 items-start pl-10 justify-center">
        <h1 className="text-3xl font-semibold">Let's Prep Together</h1>
        <p className="w-[60%]">
          Stop looking for a secret trick and recognize that the best version of
          yourself should be your vision, not anybody else's
        </p>
        <div className="w-full flex flex-row gap-5">
          <Link
            href={"/student"}
            className="px-7 py-3 border border-gray-50 rounded-md cursor-pointer hover:text-black hover:bg-white transition-all duration-500"
          >
            Student Login
          </Link>
          <Link
            href={"/campany"}
            className="px-7 py-3 border border-gray-50 rounded-md cursor-pointer hover:text-black hover:bg-white transition-all duration-500"
          >
            Company Login
          </Link>
        </div>
      </div>
      <div className="w-1/2 pt-15">
        <Image src={prep} className="invert" />
      </div>
    </div>
  );
};

export default Hero;
