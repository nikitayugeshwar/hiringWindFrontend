"use client";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [job, setJob] = useState([]);
  const [search, setSearch] = useState("");
  // useEffect(() => {
  //   const fetchedAllJob = async () => {
  //     try {
  //       const response = await api.get(
  //         "/api/job/getAllJob",
  //         { withCredentials: true },
  //       );
  //       console.log("response", response);
  //       if (response.data.success) {
  //         setJob(response.data.data);
  //       }
  //     } catch (error) {
  //       console.log("error while getting all jobs", error);
  //     }
  //   };
  //   fetchedAllJob();
  // }, []);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/api/job/searchJob", { searchType: search });
      if (response.data.success) {
        setJob(response.data.data);
      }
    } catch (error) {
      console.log("error while search", search);
    }
  };

  return (
    <div className="w-full bg-red-100 p-5 flex flex-col">
      <div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="h-15 border border-gray-300 rounded-2xl p-2"
        />
        <button
          className="h-12 p-5 border border-gray-400 cursor-pointer flex items-center justify-center rounded-2xl "
          onClick={handleSubmit}
        >
          submit
        </button>

        <div>
          {job.map((item, index) => {
            return (
              <>
                <div key={index} className="flex flex-row gap-5">
                  <h1>{item.jobTitle}</h1>
                  <h1>{item.companyName}</h1>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
