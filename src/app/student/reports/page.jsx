// student/mockTest/page.js
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Code,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import api from "@/utils/api";

const Page = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedInterview = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/interview/getInterviewListByUserId`,
          { withCredentials: true },
        );

        if (response.data.success) {
          setInterviewData(response.data.data);
        }
      } catch (error) {
        console.log("error while fetched interview", error);
      } finally {
        setLoading(false);
      }
    };

    fetchedInterview();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-green-500/20 text-green-500 border border-green-500/20",
      "In Progress":
        "bg-yellow-500/20 text-yellow-500 border border-yellow-500/20",
      Scheduled: "bg-blue-500/20 text-blue-500 border border-blue-500/20",
    };
    return (
      colors[status] || "bg-pink-500/20 text-pink-500 border border-pink-500/20"
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h1 className="text-3xl md:text-4xl font-bold font-serif">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Your Interviews
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg ml-9">
            Track your interview history and performance in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Award className="w-5 h-5" />}
            label="Total Interviews"
            value={interviewData.length}
            gradient="from-pink-500 to-pink-600"
          />
          <StatCard
            icon={<Code className="w-5 h-5" />}
            label="Topics Covered"
            value={new Set(interviewData.map((i) => i.technology)).size}
            gradient="from-purple-500 to-pink-500"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Completed"
            value={interviewData.filter((i) => i.status === "Completed").length}
            gradient="from-pink-600 to-purple-600"
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="Avg. Score"
            value="85%"
            gradient="from-purple-600 to-pink-500"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
            <span className="ml-3 text-gray-400">Loading interviews...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && interviewData.length === 0 && (
          <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20">
            <Code className="w-16 h-16 text-pink-500/30 mx-auto mb-4" />
            <h3 className="text-xl text-white font-semibold mb-2">
              No Interviews Yet
            </h3>
            <p className="text-gray-400">
              Start your first mock interview to see results here
            </p>
            <Link href="/student/mockTest/new">
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-medium hover:shadow-2xl hover:shadow-pink-500/25 transition-all">
                Start Interview
              </button>
            </Link>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && interviewData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewData.map((interview, index) => (
              <Link
                href={`/student/reports/${interview._id}`}
                key={interview._id}
                className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 overflow-hidden"
              >
                {/* Background Gradient Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                        <Code className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-white group-hover:text-pink-500 transition-colors">
                        {interview.technology || "General"}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${getStatusColor(interview.status)}`}
                    >
                      {interview.status || "In Progress"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Award className="w-4 h-4 text-pink-500" />
                      <span>
                        Experience Level:{" "}
                        {interview.experience || "Intermediate"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-pink-500" />
                      <span>
                        {interview.date || new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4 text-pink-500" />
                      <span>{interview.questionsNumber || 0} Questions</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {interview.status === "Completed" && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Score</span>
                        <span className="text-pink-500">
                          {interview.score || 75}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                          style={{ width: `${interview.score || 75}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      ID: {interview._id.slice(-6)}
                    </span>
                    <span className="flex items-center gap-1 text-pink-500 text-sm group-hover:gap-2 transition-all">
                      View Report
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-full"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, gradient }) => (
  <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl border border-pink-500/20 p-5 hover:border-pink-500/40 transition-all duration-300">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}
    ></div>
    <div className="relative flex items-center gap-3">
      <div
        className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default Page;
