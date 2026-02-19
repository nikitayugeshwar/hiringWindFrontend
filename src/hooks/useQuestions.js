import { useState, useEffect } from "react";
import { fetchQuestions } from "../services/interview/api";
import axios from "axios";

export const useQuestions = (questionIdMilGaya, transcript, setStepCount) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const questions = await fetchQuestions(questionIdMilGaya);
        setQuestionData(questions);
        setError(null);
      } catch (error) {
        console.log("error while fetching the questions", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (questionIdMilGaya) {
      getQuestions();
    }
  }, [questionIdMilGaya]);

  const goToNextQuestion = () => {
    if (transcript) {
      setQuestionData((prev) =>
        prev.map((item, index) =>
          index === currentQuestionIndex
            ? { ...item, userAnswer: transcript }
            : item,
        ),
      );
    }

    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const saveQuestion = () => {
    if (transcript) {
      setQuestionData((prev) =>
        prev.map((item, index) =>
          index === currentQuestionIndex
            ? { ...item, userAnswer: transcript }
            : item,
        ),
      );
    }
  };

  const endInterview = async (questionIdMilGaya) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/interview/endInterview/${questionIdMilGaya}`,
        { questionData },
      );

      if (response.data.success) {
        alert("sumitted");
        setStepCount(3);
      }
    } catch (error) {
      console.log("error while submiiting the questions", error);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return {
    currentQuestionIndex,
    questionData,
    loading,
    error,
    goToNextQuestion,
    goToPreviousQuestion,
    endInterview,
    saveQuestion,
  };
};
