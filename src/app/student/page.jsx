// student/page.js
import React from "react";
import StatsCards from "./_components/StatsCards";
import StudentTable from "./_components/StudentTable";
import UpcomingInterviews from "./_components/UpcomingInterviews";
import PerformanceChart from "./_components/PerformanceChart";
import RecommendedJobs from "./_components/RecommendedJobs";

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-black to-purple-900/20 p-6 space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards
          title="Total Interviews"
          value="24"
          change="+12%"
          icon="🎯"
          gradient="from-pink-500 to-pink-600"
        />
        <StatsCards
          title="Avg. Score"
          value="85%"
          change="+5%"
          icon="⭐"
          gradient="from-purple-500 to-pink-500"
        />
        <StatsCards
          title="Jobs Applied"
          value="18"
          change="+3"
          icon="💼"
          gradient="from-pink-600 to-purple-600"
        />
        <StatsCards
          title="Profile Views"
          value="142"
          change="+28%"
          icon="👁️"
          gradient="from-purple-600 to-pink-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

        {/* Upcoming Interviews - Takes 1 column */}
        <div className="lg:col-span-1">
          <UpcomingInterviews />
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <RecommendedJobs />

      {/* Performance Table */}
      <StudentTable />
    </div>
  );
};

export default page;
