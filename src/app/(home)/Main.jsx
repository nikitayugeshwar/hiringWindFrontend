import React from "react";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import Stats from "./_components/Stats";
import Testimonials from "./_components/Testimonials";
import About from "./_components/About";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

const Main = () => {
  return (
    <div className="w-full flex flex-col bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Main;
