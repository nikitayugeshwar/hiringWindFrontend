import React from "react";
import { Users, Building2, Briefcase, Trophy } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Students",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Building2,
      value: "500+",
      label: "Partner Companies",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      value: "2,500+",
      label: "Jobs Posted",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Trophy,
      value: "94%",
      label: "Success Rate",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="relative bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mt-4">
                {stat.value}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
