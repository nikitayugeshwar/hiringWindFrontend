"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data for past interviews
const mockInterviews = [
  {
    id: "1",
    skill: "React",
    difficulty: "Intermediate",
    date: "2023-11-15",
    performanceScore: 78,
    totalQuestions: 5,
    answeredQuestions: 5,
  },
  {
    id: "2",
    skill: "Python",
    difficulty: "Beginner",
    date: "2023-11-10",
    performanceScore: 65,
    totalQuestions: 5,
    answeredQuestions: 4,
  },
  {
    id: "3",
    skill: "Next.js",
    difficulty: "Experienced",
    date: "2023-11-05",
    performanceScore: 85,
    totalQuestions: 10,
    answeredQuestions: 9,
  },
];

const ReportsPage = ({ setStepCount }) => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const router = useRouter();

  // Mock detailed report data
  const getDetailedReport = (id) => {
    const baseReport = {
      skill: "React",
      difficulty: "Intermediate",
      date: "2023-11-15",
      totalQuestions: 5,
      answeredQuestions: 5,
      performanceScore: 78,
      feedback:
        "You demonstrated good understanding of React concepts but could improve your problem-solving approach. Practice more on state management and hooks.",
      areasToImprove: [
        "State management",
        "Custom hooks usage",
        "Performance optimization",
      ],
      questions: [
        {
          id: 1,
          text: "Explain the Virtual DOM in React",
          feedback: "Good explanation but could mention reconciliation process",
          score: 4,
        },
        {
          id: 2,
          text: "What are React hooks? Give examples",
          feedback: "Excellent examples of useState and useEffect",
          score: 5,
        },
        {
          id: 3,
          text: "How would you optimize a slow React component?",
          feedback: "Missed some optimization techniques like memoization",
          score: 3,
        },
      ],
    };

    return { ...baseReport, ...mockInterviews.find((i) => i.id === id) };
  };

  const handleInterviewSelect = (id) => {
    const report = getDetailedReport(id);
    setSelectedInterview(report);
  };

  const handleBackToList = () => {
    setSelectedInterview(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Interview Reports</h1>

        {!selectedInterview ? (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your Interview History</h2>
              <button
                onClick={() => {
                  setStepCount(1);
                }}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
              >
                Back to Dashboard
              </button>
            </div>

            <div className="space-y-4">
              {mockInterviews.map((interview) => (
                <div
                  key={interview.id}
                  onClick={() => handleInterviewSelect(interview.id)}
                  className="cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-lg p-4 border border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">
                        {interview.skill} Interview ({interview.difficulty})
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {interview.date} • {interview.answeredQuestions}/
                        {interview.totalQuestions} questions answered
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-600 rounded-full h-2.5 mr-3">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${interview.performanceScore}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">
                        {interview.performanceScore}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockInterviews.length === 0 && (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-300 mb-1">
                  No interviews completed yet
                </h3>
                <p className="text-gray-500">
                  Take your first mock interview to see your reports here
                </p>
                <button
                  onClick={() => router.push("/interview")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
                >
                  Start an Interview
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
            <button
              onClick={handleBackToList}
              className="flex items-center text-gray-400 hover:text-white mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to all reports
            </button>

            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-semibold">
                  {selectedInterview.skill} Interview Report
                </h2>
                <p className="text-gray-400">
                  {selectedInterview.date} • {selectedInterview.difficulty}{" "}
                  level • {selectedInterview.answeredQuestions}/
                  {selectedInterview.totalQuestions} questions answered
                </p>
              </div>
              <div className="bg-gray-700 px-4 py-2 rounded-lg">
                <span className="font-medium text-lg">
                  {selectedInterview.performanceScore}%
                </span>
                <span className="text-gray-400 text-sm ml-1">
                  Overall Score
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Skill Assessed</h3>
                <p className="text-gray-300">{selectedInterview.skill}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Difficulty Level</h3>
                <p className="text-gray-300">{selectedInterview.difficulty}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Completion</h3>
                <p className="text-gray-300">
                  {selectedInterview.answeredQuestions} of{" "}
                  {selectedInterview.totalQuestions} questions answered
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Overall Feedback</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">{selectedInterview.feedback}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Areas to Improve</h3>
              <div className="flex flex-wrap gap-2">
                {selectedInterview.areasToImprove.map((area, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">
                Question-wise Analysis
              </h3>
              <div className="space-y-4">
                {selectedInterview.questions?.map((question) => (
                  <div
                    key={question.id}
                    className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{question.text}</h4>
                      <div className="flex items-center">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {question.score}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{question.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => router.push("/interview")}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
              >
                Retake This Interview
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium"
              >
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
