"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiCalendar,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import api from "@/utils/api";

const Page = () => {
  const [formData, setFormData] = useState([]);
  const [counts, setCounts] = useState({});
  const [deleted, setDeleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchedJob = async () => {
      try {
        setLoading(true);

        // Application counts are a separate call so a failure there still
        // leaves the job table usable.
        const [jobsResponse, countsResponse] = await Promise.allSettled([
          api.get(`/api/job/getJobComapnyId`, { withCredentials: true }),
          api.get(`/api/appliedJob/applicationCounts`, {
            withCredentials: true,
          }),
        ]);

        if (
          jobsResponse.status === "fulfilled" &&
          jobsResponse.value.data.success
        ) {
          setFormData(jobsResponse.value.data.data);
        }

        if (
          countsResponse.status === "fulfilled" &&
          countsResponse.value.data.success
        ) {
          setCounts(countsResponse.value.data.data || {});
        }
      } catch (error) {
        console.log("error while fetching the job", error);
      } finally {
        setLoading(false);
      }
    };
    fetchedJob();
  }, [deleted]);

  const totalApplications = useMemo(
    () =>
      Object.values(counts).reduce((sum, item) => sum + (item.total || 0), 0),
    [counts],
  );

  const filteredJobs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return formData.filter((job) => {
      const matchesSearch =
        !term ||
        job.jobTitle?.toLowerCase().includes(term) ||
        job.companyName?.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term) ||
        job.skills?.toLowerCase().includes(term);

      const matchesType =
        typeFilter === "all" ||
        job.jobType?.toLowerCase() === typeFilter.toLowerCase();

      const isExpired = job.deadline && new Date(job.deadline) < new Date();
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !isExpired) ||
        (statusFilter === "expired" && isExpired);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [formData, searchTerm, typeFilter, statusFilter]);

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const response = await api.delete(`/api/job/deleteJob/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setDeleted(deleted + 1);
        setShowDeleteModal(false);
        setSelectedJob(null);
      }
    } catch (err) {
      console.log("error while deleting the job", err);
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteModal = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "bg-green-100 text-green-800";
      case "part-time":
        return "bg-blue-100 text-blue-800";
      case "internship":
        return "bg-purple-100 text-purple-800";
      case "remote":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return { text: "No deadline", color: "text-gray-600 bg-gray-50" };
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0)
      return { text: "Expired", color: "text-red-600 bg-red-50" };
    if (diffDays <= 3)
      return {
        text: `${diffDays} days left`,
        color: "text-orange-600 bg-orange-50",
      };
    return {
      text: `${diffDays} days left`,
      color: "text-green-600 bg-green-50",
    };
  };

  return (
    <div className="space-y-8">
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-6 sm:p-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Job Listings
            </h1>
            <p className="text-teal-100 text-lg">
              Manage and track all your job postings
            </p>
          </div>

          <Link
            href="/company/job/addJob"
            className="group relative overflow-hidden bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
          >
            <FiPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
            <span>Post New Job</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <FiBriefcase className="text-white text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Jobs</p>
                <p className="text-white text-2xl font-bold">
                  {formData.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <FiUsers className="text-white text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Active Jobs</p>
                <p className="text-white text-2xl font-bold">
                  {
                    formData.filter(
                      (job) => new Date(job.deadline) > new Date(),
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <FiAward className="text-white text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Job Types</p>
                <p className="text-white text-2xl font-bold">
                  {new Set(formData.map((job) => job.jobType)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <FiTrendingUp className="text-white text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Applications</p>
                <p className="text-white text-2xl font-bold">
                  {totalApplications}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 md:max-w-md">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
              />
              <FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
            <p className="text-gray-500 mt-4">Loading jobs...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="overflow-x-auto scrollbar-light">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                    Job Details
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                    Location
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                    Salary
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                    Experience
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                    Deadline
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                    Applicants
                  </th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.map((item, index) => {
                  const deadlineStatus = getDeadlineStatus(item.deadline);
                  const applicants = counts[item._id]?.total || 0;

                  return (
                    <tr
                      key={item._id || index}
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.jobTitle}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.companyName}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-gray-400" />
                          <span className="text-gray-600">{item.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(item.jobType)}`}
                        >
                          {item.jobType}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiDollarSign className="text-gray-400" />
                          <span className="text-gray-600">
                            {item.salary || "Not specified"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiClock className="text-gray-400" />
                          <span className="text-gray-600">
                            {item.experience || "Fresher"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-gray-400" />
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-medium ${deadlineStatus.color}`}
                          >
                            {deadlineStatus.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          href={`/company/jobApplication/${item._id}`}
                          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
                        >
                          <FiUsers />
                          {applicants}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            href={`/company/job/${item._id}`}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200 group-hover:scale-110"
                            title="Edit Job"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            onClick={() => openDeleteModal(item)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group-hover:scale-110"
                            title="Delete Job"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBriefcase className="text-4xl text-teal-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {formData.length === 0 ? "No jobs posted yet" : "No jobs found"}
            </h3>
            <p className="text-gray-500 mb-6">
              {formData.length === 0
                ? "Get started by posting your first job opening"
                : "No jobs match your search or filters"}
            </p>
            {formData.length === 0 && (
              <Link
                href="/company/job/addJob"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
              >
                <FiPlus />
                Post Your First Job
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-slideIn">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-3xl text-red-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              Delete Job Posting
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete &quot;{selectedJob.jobTitle}
              &quot;? Its applications will be removed too. This action cannot
              be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedJob(null);
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedJob._id)}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
