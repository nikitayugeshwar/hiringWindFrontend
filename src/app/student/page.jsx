// student/page.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, RefreshCw } from "lucide-react";
import api from "@/utils/api";
import { useUser } from "@/hooks/useUser";
import StatsCards from "./_components/StatsCards";
import StudentTable from "./_components/StudentTable";
import UpcomingInterviews from "./_components/UpcomingInterviews";
import PerformanceChart from "./_components/PerformanceChart";
import RecommendedJobs from "./_components/RecommendedJobs";

const Page = () => {
  const { userData } = useUser();
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        // Recommended jobs come from the same listing the Jobs page uses, so a
        // failure there should not blank out the whole dashboard.
        const [statsResponse, jobsResponse] = await Promise.allSettled([
          api.get(`/api/user/dashboardStats`, { withCredentials: true }),
          api.get(`/api/job/getAllJob`, { withCredentials: true }),
        ]);

        if (
          statsResponse.status === "fulfilled" &&
          statsResponse.value.data.success
        ) {
          setStats(statsResponse.value.data.data);
        }

        if (
          jobsResponse.status === "fulfilled" &&
          jobsResponse.value.data.success
        ) {
          setJobs(jobsResponse.value.data.data || []);
        }
      } catch (error) {
        console.log("error while fetching the dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const firstName = userData?.name?.split(" ")[0];

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-black via-black to-purple-900/20 p-4 sm:p-6 space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Here is how your interview practice is going.
          </p>
        </div>

        <Link
          href="/student/mockTest"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-medium hover:shadow-2xl hover:shadow-pink-500/25 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Start a mock interview
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCards
          title="Total Interviews"
          value={loading ? "—" : (stats?.totalInterviews ?? 0)}
          hint={
            stats ? `${stats.attemptedInterviews} attempted` : "Loading..."
          }
          icon="🎯"
          gradient="from-pink-500 to-pink-600"
        />
        <StatsCards
          title="Avg. Score"
          value={loading ? "—" : `${stats?.avgScore ?? 0}%`}
          hint="Across attempted interviews"
          icon="⭐"
          gradient="from-purple-500 to-pink-500"
        />
        <StatsCards
          title="Jobs Applied"
          value={loading ? "—" : (stats?.jobsApplied ?? 0)}
          hint={stats ? `${stats.shortlisted} shortlisted` : "Loading..."}
          icon="💼"
          gradient="from-pink-600 to-purple-600"
        />
        <StatsCards
          title="Upcoming Interviews"
          value={loading ? "—" : (stats?.upcomingInterviews?.length ?? 0)}
          hint="Scheduled by companies"
          icon="📅"
          gradient="from-purple-600 to-pink-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Performance Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <PerformanceChart trend={stats?.trend || []} loading={loading} />
        </div>

        {/* Upcoming Interviews - Takes 1 column */}
        <div className="lg:col-span-1">
          <UpcomingInterviews
            interviews={stats?.upcomingInterviews || []}
            loading={loading}
          />
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <RecommendedJobs jobs={jobs} loading={loading} />

      {/* Performance Table */}
      <StudentTable performance={stats?.performance || []} loading={loading} />
    </div>
  );
};

export default Page;
