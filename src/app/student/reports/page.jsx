"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCode, FiX, FiCalendar, FiClock } from "react-icons/fi";
import Link from "next/link";

const Page = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedInterview = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/interview/getInterviewListByUserId`,
          { withCredentials: true },
        );

        if (response.data.success) {
          setInterviewData(response.data.data);
        }
      } catch (error) {
        console.log("error while fetched interview", error);
      } finally {
        setLoading(false);
      }
    };

    fetchedInterview();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Your Interviews
        </h1>
        <p className="text-gray-600 mb-8">
          Track your interview history and performance in one place.
        </p>

        {loading && (
          <p className="text-blue-600 font-medium">Loading interviews...</p>
        )}

        {!loading && interviewData.length === 0 && (
          <p className="text-gray-500">No interviews found.</p>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewData.map((interview) => (
            <Link
              href={`/student/reports/${interview._id}`}
              key={interview._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiCode className="text-blue-600" />
                  <span className="font-semibold text-gray-800">
                    {interview.technology}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    interview.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {interview.status || "In Progress"}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>Experience: {interview.experience}</p>
                <p>Questions: {interview.questionsNumber}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedInterview && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
              <button
                onClick={() => setSelectedInterview(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <FiX size={20} />
              </button>

              <h2 className="text-2xl font-semibold mb-4">
                {selectedInterview.technology} Interview
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Experience:</strong> {selectedInterview.experience}
                </p>
                <p>
                  <strong>Questions:</strong>{" "}
                  {selectedInterview.questionsNumber}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedInterview.status || "In Progress"}
                </p>
                {selectedInterview.feedback && (
                  <p>
                    <strong>Feedback:</strong> {selectedInterview.feedback}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedInterview(null)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
