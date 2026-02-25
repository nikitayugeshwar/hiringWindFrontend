"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const student = [
    {
      id: 1,
      name: "nikita",
      age: "28",
    },
    {
      id: 2,
      name: "Aman",
      age: "18",
    },
    {
      id: 3,
      name: "Jhon",
      age: "12",
    },
    {
      id: 4,
      name: "Jhony",
      age: "75",
    },

    {
      id: 5,
      name: "bean",
      age: "52",
    },

    {
      id: 6,
      name: "cat",
      age: "30",
    },
  ];
  const [search, setSearch] = useState("");
  const [interviewData, setInterviewData] = useState([]);

  useEffect(() => {
    const fetchedinterview = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/interview/getInterview`,
        );
        if (response.data.success) {
          //   alert(response.data.message);
          setInterviewData(response.data.data);
        }
      } catch (error) {
        console.log("error while getting the interview", error);
      }
    };
    fetchedinterview();
  }, []);

  const filterData = interviewData.filter((item) =>
    `${item.technology}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-5">
      <div>
        <input
          type="text"
          placeholder="search input"
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-black px-5 py-2"
        />
      </div>
      <div className="w-full flex flex-row gap-2">
        {filterData.map((item, index) => {
          return (
            <div
              key={index}
              className="h-56 w-56 border border-black rounded-2xl flex flex-col gap-2 items-center justify-center bg-red-100"
            >
              <h1>{item.technology}</h1>
              <h1>{item._id}</h1>
              <h1>{item.experience}</h1>
              <h1>{item.questionsNumber}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
