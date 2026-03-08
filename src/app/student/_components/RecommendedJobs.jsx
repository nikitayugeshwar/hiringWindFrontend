// student/_components/RecommendedJobs.js
import React from "react";
import { Building2, MapPin, Clock, Briefcase } from "lucide-react";

const RecommendedJobs = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $150k",
      match: "95%",
    },
    {
      title: "React Developer",
      company: "Startup Inc",
      location: "New York",
      type: "Remote",
      salary: "$100k - $130k",
      match: "92%",
    },
    {
      title: "Full Stack Engineer",
      company: "Enterprise Co",
      location: "San Francisco",
      type: "Hybrid",
      salary: "$140k - $180k",
      match: "88%",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recommended Jobs</h2>
        <button className="text-pink-500 text-sm hover:text-pink-400 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="group p-5 rounded-xl bg-black/50 border border-pink-500/10 hover:border-pink-500/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-white font-semibold">{job.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-500">
                {job.match} match
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Building2 className="w-3 h-3" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Briefcase className="w-3 h-3" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{job.salary}</span>
              </div>
            </div>

            <button className="w-full py-2 text-center text-pink-500 border border-pink-500/30 rounded-lg hover:bg-pink-500/10 transition-all text-sm">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
