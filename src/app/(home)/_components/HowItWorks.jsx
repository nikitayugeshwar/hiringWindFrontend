import React from "react";
import { UserPlus, Video, Award, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Profile",
      description:
        "Sign up and build your professional profile with skills and experience",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Video,
      title: "Practice Interviews",
      description: "Take AI-powered mock interviews with real-time feedback",
      color: "from-pink-600 to-purple-500",
    },
    {
      icon: Award,
      title: "Get Hired",
      description: "Connect with top companies and land your dream job",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div id="how-it-works" className="relative bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to accelerate your career journey
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 transform -translate-y-1/2 hidden lg:block"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br ${step.color} p-1 mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>

                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-12 -right-6 w-6 h-6 text-pink-500/50" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
