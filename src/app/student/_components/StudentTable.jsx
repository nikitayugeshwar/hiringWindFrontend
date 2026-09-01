// student/_components/StudentTable.js
import React from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const scoreColor = (score) => {
  if (score >= 75) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const StudentTable = ({ performance = [], loading = false }) => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Performance Overview
        </h2>
        <Link
          href="/student/reports"
          className="px-4 py-2 text-sm text-pink-500 border border-pink-500/30 rounded-lg hover:bg-pink-500/10 transition-all whitespace-nowrap"
        >
          All reports
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-12 bg-pink-500/10 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : performance.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-pink-500/30 mx-auto mb-3" />
          <p className="text-white font-medium">No performance data yet</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">
            Complete a mock interview and your scores will break down by
            technology here
          </p>
          <Link
            href="/student/mockTest"
            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-medium hover:shadow-2xl hover:shadow-pink-500/25 transition-all"
          >
            Start your first interview
          </Link>
        </div>
      ) : (
        <>
          {/* Table — from md up */}
          <div className="hidden md:block overflow-x-auto custom-scrollbar">
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
                </tr>
              </thead>
              <tbody>
                {performance.map((item, index) => (
                  <tr
                    key={item.technology}
                    className="border-b border-pink-500/10 hover:bg-pink-500/5 transition-colors group"
                  >
                    <td className="py-4 px-4 text-white">{index + 1}</td>
                    <td className="py-4 px-4">
                      <span className="text-white font-medium capitalize">
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
                            className={`h-full ${scoreColor(item.score)}`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">
                          {item.score}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {item.score >= 70 ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — below md, where a 7-column table cannot breathe */}
          <div className="md:hidden space-y-3">
            {performance.map((item) => (
              <div
                key={item.technology}
                className="p-4 rounded-xl bg-black/50 border border-pink-500/10"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-white font-medium capitalize">
                    {item.technology}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">{item.score}%</span>
                    {item.score >= 70 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>

                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full ${scoreColor(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{item.totalQ} questions</span>
                  <span className="text-green-500">{item.correct} correct</span>
                  <span className="text-red-500">{item.wrong} wrong</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentTable;
