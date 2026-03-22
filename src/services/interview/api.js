import api from "@/utils/api";
import axios from "axios";

export const fetchQuestions = async (questionIdMilGaya) => {
  try {
    const response = await api.get(
      `/api/interview/getQuestions/${questionIdMilGaya}`,
    );
    if (response.data.success) {
      return response.data.data.questions;
    }
    return [];
  } catch (error) {
    console.log("error while fetching the questions", error);
    throw error;
  }
};
