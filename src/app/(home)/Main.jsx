import React from "react";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";

const Main = () => {
  return (
    <div className="h-screen w-full flex flex-col ">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Main;
