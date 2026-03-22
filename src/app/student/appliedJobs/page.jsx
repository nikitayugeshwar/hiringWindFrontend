// student/appliedJobs/page.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  User,
  Mail,
  CheckCircle,
  XCircle,
  Clock3,
  Eye,
  Download,
  Sparkles,
  Loader2,
  Filter,
  Search,
  Calendar,
} from "lucide-react";
import api from "@/utils/api";

const Page = () => {
  const [appliedJobData, setAppliedJobData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/appliedJob/getAppliedJob`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setAppliedJobData(response.data.data);
          setFilteredData(response.data.data);
        }
      } catch (error) {
        console.log("error while fetching applied job", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJob();
  }, []);

  // Filter applications based on search and status
  useEffect(() => {
    let filtered = appliedJobData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.jobId?.jobTitle
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.jobId?.companyName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchTerm, statusFilter, appliedJobData]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-500 border border-yellow-500/20",
      reviewed: "bg-blue-500/20 text-blue-500 border border-blue-500/20",
      shortlisted: "bg-green-500/20 text-green-500 border border-green-500/20",
      rejected: "bg-red-500/20 text-red-500 border border-red-500/20",
      hired: "bg-purple-500/20 text-purple-500 border border-purple-500/20",
    };
    return (
      colors[status?.toLowerCase()] ||
      "bg-gray-500/20 text-gray-500 border border-gray-500/20"
    );
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock3 className="w-4 h-4" />;
      case "reviewed":
        return <Eye className="w-4 h-4" />;
      case "shortlisted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "hired":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <Briefcase className="w-8 h-8 text-pink-500 absolute top-6 left-1/2 transform -translate-x-1/2 animate-pulse" />
          </div>
          <p className="text-gray-400 mt-4">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Applications
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg ml-12">
            Track and manage your job applications
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Briefcase className="w-5 h-5" />}
            label="Total Applications"
            value={appliedJobData.length}
            gradient="from-pink-500 to-pink-600"
          />
          <StatCard
            icon={<Clock3 className="w-5 h-5" />}
            label="Pending"
            value={
              appliedJobData.filter((item) => item.status === "pending").length
            }
            gradient="from-yellow-500 to-yellow-600"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Shortlisted"
            value={
              appliedJobData.filter(
                (item) =>
                  item.status === "shortlisted" || item.status === "hired",
              ).length
            }
            gradient="from-green-500 to-green-600"
          />
          <StatCard
            icon={<Building2 className="w-5 h-5" />}
            label="Companies"
            value={
              new Set(appliedJobData.map((item) => item.jobId?.companyName))
                .size
            }
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, job title, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-pink-500/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 w-4 h-4 z-10" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-black/50 border border-pink-500/20 rounded-xl py-3 pl-10 pr-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-pink-500 transition-colors"
              >
                <option value="all" className="bg-gray-900">
                  All Status
                </option>
                <option value="pending" className="bg-gray-900">
                  Pending
                </option>
                <option value="reviewed" className="bg-gray-900">
                  Reviewed
                </option>
                <option value="shortlisted" className="bg-gray-900">
                  Shortlisted
                </option>
                <option value="hired" className="bg-gray-900">
                  Hired
                </option>
                <option value="rejected" className="bg-gray-900">
                  Rejected
                </option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || statusFilter !== "all") && (
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
              {statusFilter !== "all" && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full text-sm border border-pink-500/20">
                  Status: {statusFilter}
                  <button
                    onClick={() => setStatusFilter("all")}
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
              {filteredData.length}
            </span>{" "}
            applications
          </p>
        </div>

        {/* Applications Grid */}
        {filteredData.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20">
            <Briefcase className="w-16 h-16 text-pink-500/30 mx-auto mb-4" />
            <h3 className="text-xl text-white font-semibold mb-2">
              No applications found
            </h3>
            <p className="text-gray-400 mb-6">
              You haven't applied to any jobs yet
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-medium hover:shadow-2xl hover:shadow-pink-500/25 transition-all">
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredData.map((item, index) => (
              <ApplicationCard
                key={index}
                item={item}
                index={index}
                expandedCard={expandedCard}
                setExpandedCard={setExpandedCard}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                formatDate={formatDate}
              />
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
        className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10 text-pink-500`}
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

// Application Card Component
const ApplicationCard = ({
  item,
  index,
  expandedCard,
  setExpandedCard,
  getStatusColor,
  getStatusIcon,
  formatDate,
}) => {
  const isExpanded = expandedCard === index;

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-6">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{item.fullName}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Mail className="w-3 h-3" />
                {item.email}
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}
          >
            {getStatusIcon(item.status)}
            <span className="capitalize">{item.status || "Pending"}</span>
          </div>
        </div>

        {/* Job Details */}
        {item.jobId && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-pink-500" />
              <span className="text-gray-300">{item.jobId.jobTitle}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Building2 className="w-3 h-3 text-pink-500" />
                <span>{item.jobId.companyName || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-3 h-3 text-pink-500" />
                <span>{item.jobId.location || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-3 h-3 text-pink-500" />
                <span>{item.jobId.jobType || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <DollarSign className="w-3 h-3 text-pink-500" />
                <span>{item.jobId.salary || "Competitive"}</span>
              </div>
            </div>

            {/* Experience */}
            {item.jobId.experience && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-3 h-3 text-pink-500" />
                <span>Experience: {item.jobId.experience}</span>
              </div>
            )}
          </div>
        )}

        {/* Expandable Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-pink-500/20 space-y-3">
            {/* Salary Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Current Salary</p>
                <p className="text-sm text-white">
                  {item.currentSalary || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Expected Salary</p>
                <p className="text-sm text-white">
                  {item.expectedSalary || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Notice Period</p>
                <p className="text-sm text-white">
                  {item.noticePeriod || "N/A"} days
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Applied On</p>
                <p className="text-sm text-white">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>

            {/* Resume Link */}
            {item.resumeUrl && (
              <div className="mt-2">
                <a
                  href={item.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 text-pink-500 rounded-lg text-sm hover:bg-pink-500/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  View Resume
                </a>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Application #{item._id?.slice(-6)}
          </span>
          <button
            onClick={() => setExpandedCard(isExpanded ? null : index)}
            className="text-pink-500 text-sm hover:text-pink-400 transition-colors"
          >
            {isExpanded ? "Show Less" : "View Details"}
          </button>
        </div>

        {/* Status Timeline */}
        <div className="mt-4 pt-4 border-t border-pink-500/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <p className="text-xs text-gray-400">Application Timeline</p>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <StatusDot active={true} label="Applied" />
            <div className="flex-1 h-0.5 bg-gradient-to-r from-pink-500 to-gray-700"></div>
            <StatusDot active={item.status !== "pending"} label="Reviewed" />
            <div className="flex-1 h-0.5 bg-gray-700"></div>
            <StatusDot
              active={item.status === "shortlisted" || item.status === "hired"}
              label="Shortlisted"
            />
            <div className="flex-1 h-0.5 bg-gray-700"></div>
            <StatusDot active={item.status === "hired"} label="Hired" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Status Dot Component for Timeline
const StatusDot = ({ active, label }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-3 h-3 rounded-full ${active ? "bg-pink-500" : "bg-gray-700"}`}
    ></div>
    <span className="text-xs text-gray-500 mt-1">{label}</span>
  </div>
);

export default Page;
