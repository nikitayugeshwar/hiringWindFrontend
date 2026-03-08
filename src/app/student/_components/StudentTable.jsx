// student/_components/StudentTable.js
import React from "react";
import { Eye, TrendingUp, TrendingDown } from "lucide-react";

const StudentTable = () => {
  const performanceData = [
    {
      id: 1,
      technology: "React",
      totalQ: 20,
      correct: 15,
      wrong: 5,
      score: 75,
      trend: "up",
    },
    {
      id: 2,
      technology: "JavaScript",
      totalQ: 25,
      correct: 22,
      wrong: 3,
      score: 88,
      trend: "up",
    },
    {
      id: 3,
      technology: "Node.js",
      totalQ: 18,
      correct: 12,
      wrong: 6,
      score: 66.7,
      trend: "down",
    },
    {
      id: 4,
      technology: "Python",
      totalQ: 22,
      correct: 18,
      wrong: 4,
      score: 81.8,
      trend: "up",
    },
    {
      id: 5,
      technology: "System Design",
      totalQ: 15,
      correct: 9,
      wrong: 6,
      score: 60,
      trend: "down",
    },
    {
      id: 6,
      technology: "Data Structures",
      totalQ: 30,
      correct: 24,
      wrong: 6,
      score: 80,
      trend: "up",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Performance Overview
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-pink-500 border border-pink-500/30 rounded-lg hover:bg-pink-500/10 transition-all">
            This Month
          </button>
          <button className="px-4 py-2 text-sm text-gray-400 hover:text-pink-500 transition-all">
            All Time
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-pink-500/20">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                S.No
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Technology
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Total Questions
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Correct
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Wrong
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Score
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Trend
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-pink-500/10 hover:bg-pink-500/5 transition-colors group"
              >
                <td className="py-4 px-4 text-white">{index + 1}</td>
                <td className="py-4 px-4">
                  <span className="text-white font-medium">
                    {item.technology}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-300">{item.totalQ}</td>
                <td className="py-4 px-4">
                  <span className="text-green-500">{item.correct}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-red-500">{item.wrong}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          item.score >= 75
                            ? "bg-green-500"
                            : item.score >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm">{item.score}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {item.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </td>
                <td className="py-4 px-4">
                  <button className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
