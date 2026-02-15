"use client";
import axios from "axios";
import React, { useState } from "react";

const Component11 = ({ AddKarnahai11, isNumber }) => {
  const [questionNumber, SetQuestionNumber] = useState();

  const questionCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/interview/getCount",
      );
      if (response.data.success) {
        AddKarnahai11(response.data.data);
        alert(response.data.data);
      }
    } catch (error) {
      console.log("error while count the question", error.message);
    }
  };

  return (
    <div
      className="h-20 w-auto border border-gray-500 flex items-center justify-center px-5 cursor-pointer"
      onClick={questionCount}
    >
      Count
    </div>
  );
};

export default Component11;
