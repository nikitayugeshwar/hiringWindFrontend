"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiVideo,
  FiCalendar,
  FiClock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiSearch,
  FiDownload,
  FiUser,
  FiFileText,
} from "react-icons/fi";
import api from "@/utils/api";

const Page = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rangeFilter, setRangeFilter] = useState("upcoming");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/appliedJob/scheduledInterviews`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setInterviews(response.data.data || []);
        }
      } catch (error) {
        console.log("error while fetching the interviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const { upcoming, past } = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return {
      upcoming: interviews.filter(
        (item) => new Date(item.interviewDate) >= startOfToday,
      ),
      past: interviews.filter(
        (item) => new Date(item.interviewDate) < startOfToday,
      ),
    };
  }, [interviews]);

  const filtered = useMemo(() => {
    const source =
      rangeFilter === "upcoming"
        ? upcoming
        : rangeFilter === "past"
          ? past
          : interviews;

    if (!searchTerm) return source;

    const term = searchTerm.toLowerCase();
    return source.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.jobTitle?.toLowerCase().includes(term),
    );
  }, [rangeFilter, searchTerm, upcoming, past, interviews]);

  const formatDate = (value) => {
    if (!value) return "Date TBC";
    return new Date(value).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-6 sm:p-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Interviews
          </h1>
          <p className="text-teal-100 text-base sm:text-lg">
            Every interview you have scheduled with a candidate
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <StatTile
              icon={<FiVideo className="text-white text-xl" />}
              label="Total Scheduled"
              value={interviews.length}
            />
            <StatTile
              icon={<FiCalendar className="text-white text-xl" />}
              label="Upcoming"
              value={upcoming.length}
            />
            <StatTile
              icon={<FiClock className="text-white text-xl" />}
              label="Past"
              value={past.length}
            />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 md:max-w-md">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate, email or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
            />
          </div>

          <div className="flex gap-2">
            {[
              { value: "upcoming", label: "Upcoming" },
              { value: "past", label: "Past" },
              { value: "all", label: "All" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setRangeFilter(option.value)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    rangeFilter === option.value
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-200"
                      : "bg-gray-50 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interview List */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-4">Loading interviews...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  {/* Candidate */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                      {item.fullName?.charAt(0).toUpperCase() || "?"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {item.fullName}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <FiBriefcase className="shrink-0" />
                        <span className="text-sm truncate">
                          {item.jobTitle}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        <div className="flex items-center gap-2 text-gray-600 min-w-0">
                          <FiMail className="text-gray-400 shrink-0" />
                          <span className="text-sm truncate">{item.email}</span>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiPhone className="text-gray-400 shrink-0" />
                            <span className="text-sm">{item.phone}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center gap-2 text-gray-600 min-w-0">
                            <FiMapPin className="text-gray-400 shrink-0" />
                            <span className="text-sm truncate">
                              {item.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 lg:border-l lg:border-gray-200 lg:pl-6 shrink-0">
                    <div className="bg-teal-50 rounded-xl px-4 py-3 text-center sm:text-left">
                      <div className="flex items-center gap-2 text-teal-700 font-medium">
                        <FiCalendar className="shrink-0" />
                        <span className="text-sm whitespace-nowrap">
                          {formatDate(item.interviewDate)}
                        </span>
                      </div>
                      {item.interviewTime && (
                        <div className="flex items-center gap-2 text-teal-600 mt-1">
                          <FiClock className="shrink-0" />
                          <span className="text-sm">{item.interviewTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 justify-center">
                      {item.resumeUrl && (
                        <a
                          href={item.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                          title="Download Resume"
                        >
                          <FiDownload size={18} />
                        </a>
                      )}
                      <Link
                        href={`/company/jobApplication/${item.jobId}`}
                        className="px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm hover:bg-teal-700 transition-colors whitespace-nowrap"
                      >
                        View application
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg p-10 sm:p-16 text-center">
          <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-4xl text-teal-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No interviews found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? "No interviews match your search"
              : "Shortlist a candidate from an application to schedule their interview"}
          </p>
          <Link
            href="/company/jobApplication"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
          >
            <FiFileText />
            Go to applications
          </Link>
        </div>
      )}
    </div>
  );
};

const StatTile = ({ icon, label, value }) => (
  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-white/20 rounded-lg">{icon}</div>
      <div>
        <p className="text-white/80 text-sm">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default Page;
