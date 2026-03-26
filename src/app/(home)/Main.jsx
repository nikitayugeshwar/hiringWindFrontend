import React from "react";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import Stats from "./_components/Stats";
import Testimonials from "./_components/Testimonials";
import Footer from "./_components/Footer";

const Main = () => {
  return (
    <div className="w-full flex flex-col bg-black  ">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Main;
