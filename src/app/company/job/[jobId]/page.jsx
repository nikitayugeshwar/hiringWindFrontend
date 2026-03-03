"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const { jobId } = useParams();
  console.log("jobId", jobId);
  const router = useRouter();

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
    skills: "",
    description: "",
    deadline: "",
  });

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const jobData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/job/fetchedJobById/${jobId}`,
        );
        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.log("error while update job", error);
      }
    };
    jobData();
  }, [jobId]);

  // 🔹 Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/job/updateJob/${jobId}`,
        formData,
        { withCredentials: true },
      );

      if (response.data.success) {
        alert("Job updated successfully");
        router.push("/company/job");
      }
    } catch (error) {
      console.log("Error updating job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Update Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Title */}
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Location & Job Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          {/* Salary & Experience */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Experience Required
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium mb-1">Required Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Job Description</label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            ></textarea>
          </div>

          {/* Deadline */}
          <div>
            <label className="block font-medium mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline?.split("T")[0] || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
