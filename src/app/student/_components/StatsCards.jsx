// student/_components/StatsCards.js
import React from "react";
import { TrendingUp } from "lucide-react";

const StatsCards = ({ title, value, change, icon, gradient }) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10">
      {/* Gradient Background Animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10`}
          >
            <span className="text-2xl">{icon}</span>
          </div>
          <div
            className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
          >
            <TrendingUp className={`w-4 h-4 ${!isPositive && "rotate-180"}`} />
            <span>{change}</span>
          </div>
        </div>

        <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>

        {/* Decorative Line */}
        <div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        ></div>
      </div>
    </div>
  );
};

export default StatsCards;
