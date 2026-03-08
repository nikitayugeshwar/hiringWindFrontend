// student/_components/UpcomingInterviews.js
import React from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const UpcomingInterviews = () => {
  const interviews = [
    {
      technology: "React",
      date: "2024-01-25",
      time: "10:00 AM",
      difficulty: "Intermediate",
    },
    {
      technology: "System Design",
      date: "2024-01-26",
      time: "2:00 PM",
      difficulty: "Advanced",
    },
    {
      technology: "JavaScript",
      date: "2024-01-27",
      time: "11:30 AM",
      difficulty: "Beginner",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6 h-full">
      <h2 className="text-xl font-semibold text-white mb-6">
        Upcoming Interviews
      </h2>

      <div className="space-y-4">
        {interviews.map((interview, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl bg-black/50 border border-pink-500/10 hover:border-pink-500/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">{interview.technology}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  interview.difficulty === "Beginner"
                    ? "bg-green-500/20 text-green-500"
                    : interview.difficulty === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-red-500/20 text-red-500"
                }`}
              >
                {interview.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{interview.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{interview.time}</span>
              </div>
            </div>

            <button className="flex items-center gap-2 text-pink-500 text-sm group-hover:gap-3 transition-all">
              Start Interview
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 text-center text-pink-500 border border-pink-500/30 rounded-xl hover:bg-pink-500/10 transition-all">
        View All Interviews
      </button>
    </div>
  );
};

export default UpcomingInterviews;
