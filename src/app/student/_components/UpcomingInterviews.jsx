// student/_components/UpcomingInterviews.js
import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, CalendarClock } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "Date TBC";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const UpcomingInterviews = ({ interviews = [], loading = false }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-5 sm:p-6 h-full flex flex-col">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
        Upcoming Interviews
      </h2>

      <div className="space-y-4 flex-1">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-black/50 border border-pink-500/10 animate-pulse"
            >
              <div className="h-4 bg-pink-500/20 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-pink-500/10 rounded w-3/4"></div>
            </div>
          ))
        ) : interviews.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-8">
            <CalendarClock className="w-12 h-12 text-pink-500/30 mb-3" />
            <p className="text-white font-medium">Nothing scheduled</p>
            <p className="text-sm text-gray-400 mt-1">
              Companies will schedule interviews once you are shortlisted
            </p>
          </div>
        ) : (
          interviews.map((interview) => (
            <div
              key={interview._id}
              className="group p-4 rounded-xl bg-black/50 border border-pink-500/10 hover:border-pink-500/30 transition-all"
            >
              <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="text-white font-medium">{interview.jobTitle}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500 whitespace-nowrap">
                  Scheduled
                </span>
              </div>

              {interview.companyName && (
                <p className="text-sm text-gray-400 mb-2">
                  {interview.companyName}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(interview.interviewDate)}</span>
                </div>
                {interview.interviewTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{interview.interviewTime}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href="/student/appliedJobs"
        className="block w-full mt-4 py-3 text-center text-pink-500 border border-pink-500/30 rounded-xl hover:bg-pink-500/10 transition-all"
      >
        <span className="inline-flex items-center gap-2">
          View all applications
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </div>
  );
};

export default UpcomingInterviews;
