import api from "@/utils/api";

export const fetchInterview = async (questionIdMilGaya) => {
  try {
    const response = await api.get(
      `/api/interview/getQuestions/${questionIdMilGaya}`,
    );
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.log("error while fetching the interview", error);
    throw error;
  }
};

export const fetchQuestions = async (questionIdMilGaya) => {
  const interview = await fetchInterview(questionIdMilGaya);
  return interview?.questions || [];
};
