"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [reportData, setReportData] = useState({});
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchedInterviewById = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/interview/getQuestions/${id}`,
        );
        console.log("response", response);
        if (response.data.success) {
          setReportData(response.data.data);
        }
      } catch (error) {
        console.log("error while fetching interview by id", error);
      }
    };
    fetchedInterviewById();
  }, [id]);

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return "text-green-400";
    if (accuracy >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getAccuracyBg = (accuracy) => {
    if (accuracy >= 80) return "bg-green-500/20";
    if (accuracy >= 60) return "bg-yellow-500/20";
    return "bg-red-500/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Interview Reports
            </h1>
            <p className="text-gray-400 mt-2">
              Detailed analysis of your interview performance
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Reports
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Questions</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {reportData.questionsNumber}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg. Accuracy</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {Math.round(
                    reportData?.questions?.reduce(
                      (acc, item) => acc + item.accuracy,
                      0,
                    ) / reportData?.questions?.length,
                  )}
                  %
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Topics Covered</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {reportData.technology}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Time</p>
                <p className="text-3xl font-bold text-white mt-2">7:30</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reportData?.questions?.map((report, index) => (
            <div
              key={report.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group"
            >
              {/* Question Header */}
              <div className="p-6 border-b border-gray-700 bg-gray-800/80">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-400">
                        Question {index + 1}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                        {report.topic}
                      </span>
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium">
                        {report.timeSpent}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {report.question}
                    </h3>
                  </div>

                  {/* Accuracy Badge */}
                  <div
                    className={`ml-4 px-4 py-2 rounded-lg ${getAccuracyBg(report.accuracy)} border border-gray-700`}
                  >
                    <p className="text-sm text-gray-400">Accuracy</p>
                    <p
                      className={`text-2xl font-bold ${getAccuracyColor(report.accuracy)}`}
                    >
                      {report.accuracy}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Answers Section */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Answer */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <p className="text-sm font-medium text-gray-300">
                        Your Answer
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300 leading-relaxed">
                        {report.userAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Correct Answer */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <p className="text-sm font-medium text-gray-300">
                        Correct Answer
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300 leading-relaxed">
                        {report.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comparison Bar */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>Answer Match</span>
                    <span className={getAccuracyColor(report.accuracy)}>
                      {report.accuracy}% Accurate
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        report.accuracy >= 80
                          ? "bg-green-500"
                          : report.accuracy >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${report.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Button */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
