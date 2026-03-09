"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
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

const Page = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/job/getJobComapnyId`,
          { withCredentials: true },
        );

        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.log("error while fetching the job", error);
      } finally {
        setLoading(false);
      }
    };
    fetchedJob();
  }, []);

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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Job Applications
            </h1>
            <p className="text-teal-100 text-lg">
              Manage and track all your job postings
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
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
                <p className="text-white text-2xl font-bold">156</p>
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
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
              <FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex gap-3">
              <select className="px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 bg-white">
                <option>All Types</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>

              <select className="px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 bg-white">
                <option>All Status</option>
                <option>Active</option>
                <option>Expired</option>
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
        ) : formData.length > 0 ? (
          <div className="overflow-x-auto">
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
                  <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {formData.map((item, index) => {
                  const deadlineStatus = getDeadlineStatus(item.deadline);

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
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            href={`/company/jobApplication/${item._id}`}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200 group-hover:scale-110"
                            title="Edit Job"
                          >
                            View
                          </Link>
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
              No jobs posted yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by posting your first job opening
            </p>
            <Link
              href="/company/job/addJob"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
            >
              <FiPlus />
              Post Your First Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
