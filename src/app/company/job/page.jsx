"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  const [formData, setFormData] = useState([]);
  const [deleted, setDeleted] = useState(0);

  useEffect(() => {
    const fetchedJob = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/job/getJobComapnyId`,
          { withCredentials: true },
        );

        console.log("response", response);
        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.log("error while fetching the job", error);
      }
    };
    fetchedJob();
  }, [deleted]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/job/deleteJob/${id}`,
      );
      if (response.data.success) {
        alert(response.data.message);
        setDeleted(deleted + 1);
      }
    } catch (err) {
      console.log("error while deleting the job", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Company Job Listings
          </h1>

          <Link
            href={"/company/job/addJob"}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md"
          >
            + Add Job
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
                <th className="py-3 px-4 text-left">S No</th>
                <th className="py-3 px-4 text-left">Job Title</th>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Salary</th>
                <th className="py-3 px-4 text-left">Experience</th>
                <th className="py-3 px-4 text-left">Skills</th>
                <th className="py-3 px-4 text-left">Deadline</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {formData.length > 0 ? (
                formData.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{item.jobTitle}</td>
                    <td className="py-3 px-4">{item.companyName}</td>
                    <td className="py-3 px-4">{item.location}</td>
                    <td className="py-3 px-4">{item.jobType}</td>
                    <td className="py-3 px-4">{item.salary}</td>
                    <td className="py-3 px-4">{item.experience}</td>
                    <td className="py-3 px-4">{item.skills}</td>
                    <td className="py-3 px-4">{item.deadline}</td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        {/* Edit Button */}
                        <Link
                          href={`/company/job/${item._id}`}
                          className="px-4 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium shadow-sm transition"
                        >
                          Edit
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                          className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">
                    No jobs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
