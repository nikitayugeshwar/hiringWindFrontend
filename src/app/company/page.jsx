"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiBriefcase,
  FiUsers,
  FiVideo,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import api from "@/utils/api";
import { useCompany } from "@/hooks/useCompany";

const Page = () => {
  const { companyData } = useCompany();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/company/dashboardStats`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.log("error while fetching dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Active Jobs",
      value: stats?.activeJobs ?? 0,
      hint: `${stats?.totalJobs ?? 0} posted in total`,
      icon: FiBriefcase,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      label: "Total Applications",
      value: stats?.totalApplications ?? 0,
      hint: `${stats?.pending ?? 0} awaiting review`,
      icon: FiFileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Interviews Scheduled",
      value: stats?.interviewsScheduled ?? 0,
      hint: `${stats?.shortlisted ?? 0} shortlisted`,
      icon: FiVideo,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Hired Candidates",
      value: stats?.hired ?? 0,
      hint: `${stats?.rejected ?? 0} rejected`,
      icon: FiUsers,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "reviewed":
        return <FiCheckCircle className="text-blue-500" />;
      case "shortlisted":
        return <FiCheckCircle className="text-green-500" />;
      case "hired":
        return <FiUsers className="text-purple-500" />;
      case "rejected":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "hired":
        return "bg-purple-100 text-purple-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (value) => {
    if (!value) return "Recently";
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 sm:p-8">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              {companyData?.companyName
                ? `Welcome back, ${companyData.companyName}`
                : "Welcome Back!"}
            </h1>
            <p className="text-gray-600 mt-2">
              Here&apos;s what&apos;s happening with your job postings today.
            </p>
          </div>

          {/* Add Job Button */}
          <Link
            href="/company/job/addJob"
            className="group relative overflow-hidden bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 transition-all duration-300 shrink-0 text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FiBriefcase className="text-lg" />
              Post New Job
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                      {loading ? "—" : stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0`}
                  >
                    <Icon className={`text-2xl ${stat.textColor}`} />
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  {loading ? "Loading..." : stat.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Recent Applications
            </h2>
            <Link
              href="/company/jobApplication"
              className="text-teal-600 hover:text-teal-700 font-medium text-sm whitespace-nowrap"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
            [...Array(3)].map((_, index) => (
              <div key={index} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            ))
          ) : stats?.recentApplications?.length ? (
            stats.recentApplications.map((application) => (
              <Link
                key={application._id}
                href={`/company/jobApplication/${application.jobId}`}
                className="block p-5 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-semibold shrink-0">
                      {application.fullName?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {application.fullName}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {application.jobTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(application.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(application.status)}`}
                      >
                        {application.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {formatDate(application.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFileText className="text-2xl text-teal-500" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-1">
                No applications yet
              </h3>
              <p className="text-sm text-gray-500">
                Applications will appear here once candidates apply to your
                postings
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <QuickAction
          href="/company/interview"
          icon={<FiVideo className="text-3xl mb-4" />}
          title="Schedule Interview"
          description={
            loading
              ? "Loading..."
              : `${stats?.shortlisted ?? 0} shortlisted candidates ready`
          }
          cta="Schedule Now"
          gradient="from-teal-500 to-teal-600"
          textTone="text-teal-100"
        />
        <QuickAction
          href="/company/jobApplication"
          icon={<FiFileText className="text-3xl mb-4" />}
          title="Review Applications"
          description={
            loading
              ? "Loading..."
              : `${stats?.pending ?? 0} applications need your review`
          }
          cta="Review Now"
          gradient="from-purple-500 to-purple-600"
          textTone="text-purple-100"
        />
        <QuickAction
          href="/company/job/addJob"
          icon={<FiBriefcase className="text-3xl mb-4" />}
          title="Create Job Posting"
          description="Post a new job opportunity"
          cta="Create Post"
          gradient="from-blue-500 to-blue-600"
          textTone="text-blue-100"
        />
      </div>
    </div>
  );
};

const QuickAction = ({
  href,
  icon,
  title,
  description,
  cta,
  gradient,
  textTone,
}) => (
  <Link
    href={href}
    className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white block hover:shadow-xl transition-shadow`}
  >
    {icon}
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className={`${textTone} text-sm mb-4`}>{description}</p>
    <span className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
      {cta}
    </span>
  </Link>
);

export default Page;
