import React from "react";
import Image from "next/image";
import Link from "next/link";
import hiring from "./hiring.png";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-black to-purple-600/20 animate-gradient-xy"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-pink-500 font-medium">
                AI-Powered Recruitment Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif mb-6">
              <span className="text-white">Let's </span>
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Prep Together
              </span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8">
              Stop looking for a secret trick and recognize that the best
              version of yourself should be your vision, not anybody else's
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <FeaturePill
                icon={<Zap className="w-4 h-4" />}
                text="AI Matching"
              />
              <FeaturePill
                icon={<Shield className="w-4 h-4" />}
                text="Anti-Cheat System"
              />
              <FeaturePill
                icon={<Sparkles className="w-4 h-4" />}
                text="Mock Interviews"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/student"
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started as Student
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                href="/company"
                className="px-8 py-4 border-2 border-pink-500/50 text-white rounded-xl font-semibold hover:bg-pink-500/10 transition-all duration-300 hover:border-pink-500"
              >
                Hire Talent
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 border-2 border-black"
                  ></div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-semibold">10,000+</span>{" "}
                students placed
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Animated gradient ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm">
                <Image
                  src={hiring}
                  alt="Preparation"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />

                {/* Floating stats cards */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-pink-500/20 animate-float">
                  <p className="text-xs text-gray-400">Match Rate</p>
                  <p className="text-lg font-bold text-white">95%</p>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-pink-500/20 animate-float delay-1000">
                  <p className="text-xs text-gray-400">Active Jobs</p>
                  <p className="text-lg font-bold text-white">1.2k+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <div className="w-6 h-10 border-2 border-pink-500/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-pink-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

const FeaturePill = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
    <span className="text-pink-500">{icon}</span>
    {text}
  </div>
);

export default Hero;
