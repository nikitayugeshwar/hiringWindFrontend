// student/_components/RecommendedJobs.js
import React from "react";
import Link from "next/link";
import { Building2, MapPin, Clock, Briefcase, Users } from "lucide-react";

const RecommendedJobs = ({ jobs = [], loading = false }) => {
  // Surface the newest postings the student has not applied to yet.
  const recommended = jobs.filter((job) => !job.hasApplied).slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Recommended Jobs
        </h2>
        <Link
          href="/student/jobs"
          className="text-pink-500 text-sm hover:text-pink-400 transition-colors whitespace-nowrap"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-black/50 border border-pink-500/10 animate-pulse"
            >
              <div className="h-5 bg-pink-500/20 rounded w-2/3 mb-4"></div>
              <div className="h-3 bg-pink-500/10 rounded w-full mb-2"></div>
              <div className="h-3 bg-pink-500/10 rounded w-4/5"></div>
            </div>
          ))}
        </div>
      ) : recommended.length === 0 ? (
        <div className="text-center py-10">
          <Briefcase className="w-12 h-12 text-pink-500/30 mx-auto mb-3" />
          <p className="text-white font-medium">No new openings right now</p>
          <p className="text-sm text-gray-400 mt-1">
            {jobs.length > 0
              ? "You have applied to every job currently posted"
              : "Check back soon for new opportunities"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((job) => (
            <div
              key={job._id}
              className="group p-5 rounded-xl bg-black/50 border border-pink-500/10 hover:border-pink-500/30 transition-all"
            >
              <div className="flex justify-between items-start gap-2 mb-3">
                <h3 className="text-white font-semibold">{job.jobTitle}</h3>
                {job.applicants > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-500 whitespace-nowrap">
                    <Users className="w-3 h-3" />
                    {job.applicants}
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Building2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {job.companyName || "Company"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{job.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Briefcase className="w-3 h-3 shrink-0" />
                  <span className="truncate">{job.jobType || "Full-time"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {job.salary || "Competitive"}
                  </span>
                </div>
              </div>

              <Link
                href="/student/jobs"
                className="block w-full py-2 text-center text-pink-500 border border-pink-500/30 rounded-lg hover:bg-pink-500/10 transition-all text-sm"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;
