import axios from "axios";

export const fetchQuestions = async (questionIdMilGaya) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/interview/getQuestions/${questionIdMilGaya}`,
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
