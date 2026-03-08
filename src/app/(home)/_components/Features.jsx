import React from "react";
import { Sparkles, Shield, Video, Zap, Brain, BarChart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Job Matching",
      description:
        "Smart algorithm matches candidates with perfect job opportunities based on skills and preferences",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Video,
      title: "AI Mock Interviews",
      description:
        "Practice with dynamic questions and get detailed performance reports",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Anti-Cheat System",
      description:
        "Real-time face detection and tab-switch monitoring for fair assessments",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description:
        "Get immediate insights on your interview performance and improvement areas",
      color: "from-pink-600 to-purple-500",
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed analytics and benchmarking",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description:
        "Companies receive recommended student profiles based on job descriptions",
      color: "from-pink-500 to-purple-600",
    },
  ];

  return (
    <div id="features" className="relative bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-transparent to-purple-500/5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to ace your interviews and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
              ></div>

              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-5 h-5 text-pink-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
