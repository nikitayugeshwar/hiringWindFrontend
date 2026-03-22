"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiClock,
  FiFileText,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiArrowLeft,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import api from "@/utils/api";

const Page = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { jobId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch applications
        const applicationsResponse = await api.get(
          `/api/appliedJob/getJobById/${jobId}`,
          { withCredentials: true },
        );

        if (applicationsResponse.data.success) {
          setApplicationData(applicationsResponse.data.data);
        }

        // Fetch job details
        const jobResponse = await api.get(`/api/job/fetchedJobById/${jobId}`, {
          withCredentials: true,
        });

        if (jobResponse.data.success) {
          setJobDetails(jobResponse.data.data);
        }
      } catch (error) {
        console.log("error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  const filteredApplications = applicationData.filter((app) => {
    const matchesSearch =
      app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone?.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-4">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with back button and job info */}
      <div className="mb-8">
        <Link
          href="/company/jobApplication"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-4"
        >
          <FiArrowLeft />
          <span>Back to Jobs</span>
        </Link>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-8">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {jobDetails?.jobTitle || "Job Applications"}
                </h1>
                <p className="text-teal-100 flex items-center gap-2">
                  <FiBriefcase />
                  {jobDetails?.companyName || "Company Name"}
                </p>
              </div>

              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur-lg rounded-xl px-6 py-3">
                  <p className="text-white/80 text-sm">Total Applications</p>
                  <p className="text-white text-2xl font-bold">
                    {applicationData.length}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-lg rounded-xl px-6 py-3">
                  <p className="text-white/80 text-sm">Shortlisted</p>
                  <p className="text-white text-2xl font-bold">
                    {
                      applicationData.filter(
                        (app) => app.status === "shortlisted",
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Job Details Summary */}
            {jobDetails && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center gap-2 text-white/90">
                  <FiMapPin className="text-teal-200" />
                  <span className="text-sm">{jobDetails.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <FiClock className="text-teal-200" />
                  <span className="text-sm">{jobDetails.jobType}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <FiDollarSign className="text-teal-200" />
                  <span className="text-sm">
                    {jobDetails.salary || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <FiAward className="text-teal-200" />
                  <span className="text-sm">
                    {jobDetails.experience || "Fresher"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Candidate Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {item.fullName?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3    mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.fullName}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {item.status || "Pending"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMail className="text-gray-400" />
                          <span className="text-sm">{item.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiPhone className="text-gray-400" />
                          <span className="text-sm">{item.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiDollarSign className="text-gray-400" />
                          <span className="text-sm">
                            Current: {formatSalary(item.currentSalary)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 lg:border-l lg:border-gray-200 lg:pl-6">
                    <button
                      onClick={() => {
                        setSelectedApplication(item);
                        setShowDetailsModal(true);
                      }}
                      className="p-3 text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                      title="View Details"
                    >
                      <FiEye size={20} />
                    </button>

                    {item.resumeUrl && (
                      <a
                        href={item.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                        title="Download Resume"
                      >
                        <FiDownload size={20} />
                      </a>
                    )}

                    <select
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        try {
                          await api.put(
                            `/api/appliedJob/updateStatus/${item._id}`,
                            { status: newStatus },
                            { withCredentials: true },
                          );
                          // Refresh data
                          const response = await api.get(
                            `/api/appliedJob/getJobById/${jobId}`,
                            { withCredentials: true },
                          );
                          if (response.data.success) {
                            setApplicationData(response.data.data);
                          }
                        } catch (error) {
                          console.log("Error updating status", error);
                        }
                      }}
                      value={item.status || "pending"}
                      className="px-4 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 bg-white text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
          <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-4xl text-teal-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No applications yet
          </h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== "all"
              ? "No applications match your search criteria"
              : "There are no applications for this job yet"}
          </p>
        </div>
      )}

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiXCircle size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiUser className="text-teal-500" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiBriefcase className="text-teal-500" />
                  Professional Details
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Current Salary</p>
                    <p className="font-medium text-gray-800">
                      {formatSalary(selectedApplication.currentSalary)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Salary</p>
                    <p className="font-medium text-gray-800">
                      {formatSalary(selectedApplication.expectedSalary)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Notice Period</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.noticePeriod || "Immediate"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills & Experience */}
              {selectedApplication.skills && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiAward className="text-teal-500" />
                    Skills
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.skills
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Resume */}
              {selectedApplication.resumeUrl && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiFileText className="text-teal-500" />
                    Resume
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
                    >
                      <FiDownload />
                      Download Resume
                    </a>
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApplication.coverLetter && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiFileText className="text-teal-500" />
                    Cover Letter
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                </div>
              )}

              {/* Application Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiCalendar className="text-teal-500" />
                  Timeline
                </h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Applied On</p>
                      <p className="font-medium text-gray-800">
                        {new Date(
                          selectedApplication.createdAt,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Current Status</p>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)}`}
                      >
                        {selectedApplication.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={async () => {
                    try {
                      await api.put(
                        `/api/appliedJob/updateStatus/${selectedApplication._id}`,
                        { status: "shortlisted" },
                        { withCredentials: true },
                      );
                      setShowDetailsModal(false);
                      // Refresh data
                      const response = await api.get(
                        `/api/appliedJob/getJobById/${jobId}`,
                        { withCredentials: true },
                      );
                      if (response.data.success) {
                        setApplicationData(response.data.data);
                      }
                    } catch (error) {
                      console.log("Error updating status", error);
                    }
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300"
                >
                  Shortlist Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
