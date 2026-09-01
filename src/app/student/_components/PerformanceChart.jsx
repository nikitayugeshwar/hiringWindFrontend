// student/_components/PerformanceChart.js
import React from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const PerformanceChart = ({ trend = [], loading = false }) => {
  // Compare the latest attempt against the one before it.
  const delta =
    trend.length >= 2 ? trend[trend.length - 1].score - trend[0].score : 0;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-5 sm:p-6 h-full">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Performance Trend
        </h2>
        {trend.length >= 2 && (
          <div
            className={`flex items-center gap-2 ${delta >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {delta >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm whitespace-nowrap">
              {delta >= 0 ? "+" : ""}
              {delta}% overall
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="h-64 flex items-end justify-between gap-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="flex-1 bg-pink-500/10 rounded-t-lg animate-pulse"
              style={{ height: `${30 + index * 8}%` }}
            ></div>
          ))}
        </div>
      ) : trend.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <BarChart3 className="w-12 h-12 text-pink-500/30 mb-3" />
          <p className="text-white font-medium">No results yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Finish a mock interview to see your trend here
          </p>
        </div>
      ) : (
        <div className="h-64 flex items-end justify-between gap-2">
          {trend.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2 group min-w-0"
            >
              <div className="relative w-full flex-1 flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg group-hover:from-pink-600 group-hover:to-purple-600 transition-all"
                  style={{ height: `${Math.max(item.score, 2)}%` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-pink-500/20 z-10">
                    {item.score}%
                  </div>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 truncate max-w-full">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;
