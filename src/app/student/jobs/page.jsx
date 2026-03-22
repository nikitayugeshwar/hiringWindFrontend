// student/jobs/page.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplyCard from "./_components/ApplyCard";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Filter,
  Building2,
} from "lucide-react";
import api from "@/utils/api";

const Page = () => {
  const [jobList, setJobList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [jobId, setJobId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    const fetchedAllJob = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/job/getAllJob`, {
          withCredentials: true,
        });
        console.log("response", response);
        if (response.data.success) {
          setJobList(response.data.data);
          setFilteredJobs(response.data.data);
        }
      } catch (error) {
        console.log("error while getting all jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchedAllJob();
  }, [status]);

  // Filter jobs based on search and type
  useEffect(() => {
    let filtered = jobList;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((job) => job.jobType === selectedType);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedType, jobList]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShow]);

  const jobTypes = [
    "all",
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black py-10 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Find Your Dream Job
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover opportunities that match your skills
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-pink-500/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 w-4 h-4 z-10" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-black/50 border border-pink-500/20 rounded-xl py-3 pl-10 pr-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-pink-500 transition-colors"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type} className="bg-gray-900">
                    {type === "all" ? "All Job Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedType !== "all") && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchTerm && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full text-sm border border-pink-500/20">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedType !== "all" && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full text-sm border border-pink-500/20">
                  Type: {selectedType}
                  <button
                    onClick={() => setSelectedType("all")}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-pink-500 font-semibold">
              {filteredJobs.length}
            </span>{" "}
            jobs
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {loading ? (
            // Loading Skeleton
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6 animate-pulse"
              >
                <div className="h-6 bg-pink-500/20 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-pink-500/10 rounded w-1/4 mb-3"></div>
                <div className="h-16 bg-pink-500/10 rounded w-full"></div>
              </div>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((item, index) => (
              <JobCard
                key={item._id || index}
                job={item}
                onApply={() => {
                  setJobId(item._id);
                  setIsShow(true);
                }}
              />
            ))
          ) : (
            // No Results
            <div className="text-center py-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20">
              <Briefcase className="w-16 h-16 text-pink-500/30 mx-auto mb-4" />
              <h3 className="text-xl text-white font-semibold mb-2">
                No jobs found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Apply Modal */}
        {isShow && (
          <ApplyCard
            onClose={() => {
              setJobId("");
              setIsShow(false);
            }}
            jobId={jobId}
            setStatus={setStatus}
          />
        )}
      </div>
    </div>
  );
};

// Job Card Component
// student/jobs/page.js - Updated JobCard Component

const JobCard = ({ job, onApply }) => {
  // Safely handle skills - convert to array if it's a string, or use empty array if undefined
  const skills = React.useMemo(() => {
    if (!job.skills) return [];
    if (Array.isArray(job.skills)) return job.skills;
    if (typeof job.skills === "string") {
      // If it's a comma-separated string, split it
      return job.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
    }
    return [];
  }, [job.skills]);

  // Safely handle job type with default
  const getJobTypeColor = (type) => {
    const jobType = type || "Full-time";
    const colors = {
      "Full-time": "bg-green-500/20 text-green-500 border border-green-500/20",
      "Part-time": "bg-blue-500/20 text-blue-500 border border-blue-500/20",
      Contract: "bg-yellow-500/20 text-yellow-500 border border-yellow-500/20",
      Internship:
        "bg-purple-500/20 text-purple-500 border border-purple-500/20",
      Remote: "bg-pink-500/20 text-pink-500 border border-pink-500/20",
    };
    return (
      colors[jobType] ||
      "bg-pink-500/20 text-pink-500 border border-pink-500/20"
    );
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 overflow-hidden">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Left Section - Job Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-semibold text-white group-hover:text-pink-500 transition-colors">
                  {job.jobTitle || "Untitled Position"}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4 text-pink-500" />
                  <p className="text-sm text-gray-400">
                    {job.company || "Tech Company"} •{" "}
                    {job.location || "Location not specified"}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}
              >
                {job.jobType || "Full-time"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {job.description || "No description provided"}
            </p>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>{job.location || "Remote"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <DollarSign className="w-4 h-4 text-pink-500" />
                <span>{job.salary || "Competitive"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-pink-500" />
                <span>
                  Posted{" "}
                  {job.postedAt
                    ? new Date(job.postedAt).toLocaleDateString()
                    : "recently"}
                </span>
              </div>
            </div>

            {/* Skills/Tags - Fixed with safe check */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20"
                  >
                    {skill}
                  </span>
                ))}
                {skills.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full">
                    +{skills.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right Section - CTA */}
          <div className="lg:text-right flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-2">
            <div className="text-sm text-gray-400 mb-2 hidden lg:block">
              <span className="text-pink-500 font-semibold">
                {job.applicants || 0}+
              </span>{" "}
              applicants
            </div>

            {job.status === "Applied" ? (
              <span className=" text-white px-8 py-3">Applied</span>
            ) : (
              <button
                onClick={onApply}
                className="relative group/btn px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/25"
              >
                <span className="relative z-10">Apply Now</span>

                <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
