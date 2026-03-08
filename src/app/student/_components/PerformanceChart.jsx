// student/_components/PerformanceChart.js
import React from "react";
import { TrendingUp } from "lucide-react";

const PerformanceChart = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Performance Trend</h2>
        <div className="flex items-center gap-2 text-green-500">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+12% this month</span>
        </div>
      </div>

      {/* Simple Chart Representation */}
      <div className="h-64 flex items-end justify-between gap-2">
        {[65, 75, 82, 78, 88, 92, 85].map((value, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-2 group"
          >
            <div className="relative w-full">
              <div
                className="w-full bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg group-hover:from-pink-600 group-hover:to-purple-600 transition-all"
                style={{ height: `${value}px` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 rounded text-xs text-white">
                  {value}%
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-400">Week {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
