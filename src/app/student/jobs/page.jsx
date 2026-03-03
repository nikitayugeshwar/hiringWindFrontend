"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplyCard from "./_components/ApplyCard";

const Page = () => {
  const [jobList, setJobList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [jobId, setJobId] = useState();

  useEffect(() => {
    const fetchedAllJob = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/job/getAllJob`,
        );
        if (response.data.success) {
          setJobList(response.data.data);
        }
      } catch (error) {
        console.log("error while getting all jobs", error);
      }
    };
    fetchedAllJob();
  }, []);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShow]);

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-6 relative">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Available Positions
        </h1>

        {isShow && (
          <ApplyCard
            onClose={() => (setJobId(""), setIsShow(false))}
            jobId={jobId}
          />
        )}

        {jobList.map((item, index) => (
          <div key={index}>
            <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.jobTitle}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Tech Company • {item.location}
                  </p>
                </div>

                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                  {item.jobType}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-6">
                <span className="text-sm font-medium text-gray-800">
                  {item.salary}
                </span>

                <button
                  onClick={() => (setJobId(item._id), setIsShow(true))}
                  className="text-sm font-medium text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
