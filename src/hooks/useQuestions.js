import { useState, useEffect } from "react";
import { fetchInterview } from "../services/interview/api";
import api from "@/utils/api";

export const useQuestions = (questionIdMilGaya, transcript, setStepCount) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchInterview(questionIdMilGaya);
        setInterview(data);
        setQuestionData(data?.questions || []);
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

  // Writes the live transcript into the question currently on screen.
  const withCurrentAnswer = (list) =>
    transcript
      ? list.map((item, index) =>
          index === currentQuestionIndex
            ? { ...item, userAnswer: transcript }
            : item,
        )
      : list;

  const goToNextQuestion = () => {
    setQuestionData((prev) => withCurrentAnswer(prev));

    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const saveQuestion = () => {
    setQuestionData((prev) => withCurrentAnswer(prev));
  };

  const endInterview = async (questionIdMilGaya) => {
    try {
      setSubmitting(true);

      // Capture the answer still on screen so ending without pressing Save
      // does not drop the last response.
      const finalAnswers = withCurrentAnswer(questionData);
      setQuestionData(finalAnswers);

      const response = await api.post(
        `/api/interview/endInterview/${questionIdMilGaya}`,
        { questionData: finalAnswers },
        { withCredentials: true },
      );

      if (response.data.success) {
        setStepCount(3);
      }
    } catch (error) {
      console.log("error while submitting the questions", error);
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const goToPreviousQuestion = () => {
    setQuestionData((prev) => withCurrentAnswer(prev));

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return {
    currentQuestionIndex,
    questionData,
    interview,
    loading,
    submitting,
    error,
    goToNextQuestion,
    goToPreviousQuestion,
    endInterview,
    saveQuestion,
  };
};
