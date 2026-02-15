import { useState, useEffect } from "react";
import { fetchQuestions } from "../services/interview/api";

export const useQuestions = (questionIdMilGaya) => {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return {
    questionData,
    currentQuestionIndex,
    loading,
    error,
    goToNextQuestion,
    goToPreviousQuestion,
  };
};
