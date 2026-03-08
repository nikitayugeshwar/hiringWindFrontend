import React from "react";
import {
  FiBriefcase,
  FiUsers,
  FiVideo,
  FiFileText,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const Page = () => {
  // Mock data - replace with actual data from your backend
  const stats = [
    {
      label: "Active Jobs",
      value: "12",
      icon: FiBriefcase,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      label: "Total Applications",
      value: "234",
      icon: FiFileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Interviews Scheduled",
      value: "18",
      icon: FiVideo,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Hired Candidates",
      value: "8",
      icon: FiUsers,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      name: "John Doe",
      position: "Frontend Developer",
      status: "pending",
      appliedDate: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Backend Developer",
      status: "reviewed",
      appliedDate: "5 hours ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "UI/UX Designer",
      status: "interview",
      appliedDate: "1 day ago",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Full Stack Developer",
      status: "rejected",
      appliedDate: "2 days ago",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "reviewed":
        return <FiCheckCircle className="text-blue-500" />;
      case "interview":
        return <FiVideo className="text-purple-500" />;
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
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your job postings today.
            </p>
          </div>

          {/* Add Job Button */}
          <button className="group relative overflow-hidden bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">
              <FiBriefcase className="text-lg" />
              Post New Job
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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

              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`text-2xl ${stat.textColor}`} />
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="flex items-center gap-2 mt-4">
                  <FiTrendingUp className="text-green-500 text-sm" />
                  <span className="text-xs text-gray-500">
                    <span className="text-green-500 font-semibold">+12%</span>{" "}
                    from last month
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Applications
            </h2>
            <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
              View All
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {recentApplications.map((application) => (
            <div
              key={application.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {application.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {application.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {application.position}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {application.appliedDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
          <FiVideo className="text-3xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Schedule Interview</h3>
          <p className="text-teal-100 text-sm mb-4">
            Set up interviews with shortlisted candidates
          </p>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Schedule Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <FiFileText className="text-3xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Review Applications</h3>
          <p className="text-purple-100 text-sm mb-4">
            12 new applications need your review
          </p>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Review Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <FiBriefcase className="text-3xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Create Job Posting</h3>
          <p className="text-blue-100 text-sm mb-4">
            Post a new job opportunity
          </p>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
