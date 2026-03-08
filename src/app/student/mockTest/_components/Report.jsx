// student/mockTest/_components/Report.js
import { useEffect, useState } from "react";
import { fetchQuestions } from "@/services/interview/api";
import {
  ArrowLeft,
  Award,
  Clock,
  Code2,
  Download,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  Target,
  Brain,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

const Report = ({ setStepCount, questionIdMilGaya }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetchQuestions(questionIdMilGaya);
        setReportData(response || []);
      } catch (error) {
        console.log("error while fetching the questions", error);
      } finally {
        setLoading(false);
      }
    };

    if (questionIdMilGaya) {
      getQuestions();
    }
  }, [questionIdMilGaya]);

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return "text-green-500";
    if (accuracy >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getAccuracyBg = (accuracy) => {
    if (accuracy >= 80) return "bg-green-500/20";
    if (accuracy >= 60) return "bg-yellow-500/20";
    return "bg-red-500/20";
  };

  const getAccuracyGradient = (accuracy) => {
    if (accuracy >= 80) return "from-green-500 to-green-400";
    if (accuracy >= 60) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  // Calculate statistics
  const totalQuestions = reportData.length;
  const avgAccuracy =
    totalQuestions > 0
      ? Math.round(
          reportData.reduce((acc, item) => acc + (item.accuracy || 0), 0) /
            totalQuestions,
        )
      : 0;
  const topicsCovered = new Set(reportData.map((item) => item.topic)).size;
  const correctAnswers = reportData.filter(
    (q) => (q.accuracy || 0) >= 70,
  ).length;

  // Format time (mock data - replace with actual if available)
  const totalTime = "07:30";

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <Sparkles className="w-8 h-8 text-pink-500 absolute top-6 left-1/2 transform -translate-x-1/2 animate-pulse" />
          </div>
          <p className="text-gray-400 mt-4">Loading your interview report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => setStepCount(1)}
              className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Interview Report
                </span>
              </h1>
            </div>
            <p className="text-gray-400 mt-2 ml-12">
              Detailed analysis of your interview performance
            </p>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-medium hover:shadow-2xl hover:shadow-pink-500/25 transition-all group">
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            Export Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard
            icon={<Brain className="w-5 h-5" />}
            label="Total Questions"
            value={totalQuestions}
            gradient="from-pink-500 to-pink-600"
          />
          <SummaryCard
            icon={<Target className="w-5 h-5" />}
            label="Avg. Accuracy"
            value={`${avgAccuracy}%`}
            gradient="from-purple-500 to-pink-500"
            valueColor={getAccuracyColor(avgAccuracy)}
          />
          <SummaryCard
            icon={<BarChart3 className="w-5 h-5" />}
            label="Topics Covered"
            value={topicsCovered}
            gradient="from-pink-600 to-purple-600"
          />
          <SummaryCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Correct Answers"
            value={correctAnswers}
            gradient="from-purple-600 to-pink-500"
            subValue={`out of ${totalQuestions}`}
          />
        </div>

        {/* Performance Overview */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Performance Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accuracy Distribution */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Accuracy Distribution
              </h3>
              <div className="space-y-3">
                <DistributionBar
                  label="Excellent (80-100%)"
                  count={
                    reportData.filter((q) => (q.accuracy || 0) >= 80).length
                  }
                  total={totalQuestions || 1}
                  color="green"
                />
                <DistributionBar
                  label="Good (60-79%)"
                  count={
                    reportData.filter((q) => {
                      const acc = q.accuracy || 0;
                      return acc >= 60 && acc < 80;
                    }).length
                  }
                  total={totalQuestions || 1}
                  color="yellow"
                />
                <DistributionBar
                  label="Needs Improvement (0-59%)"
                  count={
                    reportData.filter((q) => (q.accuracy || 0) < 60).length
                  }
                  total={totalQuestions || 1}
                  color="red"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <QuickStat
                icon={<Clock className="w-4 h-4" />}
                label="Time Spent"
                value={totalTime}
                unit="minutes"
              />
              <QuickStat
                icon={<TrendingUp className="w-4 h-4" />}
                label="Best Topic"
                value={
                  reportData.reduce(
                    (best, curr) =>
                      (curr.accuracy || 0) > (best.accuracy || 0) ? curr : best,
                    reportData[0] || {},
                  ).topic || "N/A"
                }
                unit={`${Math.max(...reportData.map((q) => q.accuracy || 0))}% accuracy`}
              />
              <QuickStat
                icon={<TrendingDown className="w-4 h-4" />}
                label="Needs Work"
                value={
                  reportData.reduce(
                    (worst, curr) =>
                      (curr.accuracy || 0) < (worst.accuracy || 100)
                        ? curr
                        : worst,
                    reportData[0] || {},
                  ).topic || "N/A"
                }
                unit={`${Math.min(...reportData.map((q) => q.accuracy || 0))}% accuracy`}
              />
              <QuickStat
                icon={<Award className="w-4 h-4" />}
                label="Rank"
                value="Top 15%"
                unit="of all tests"
              />
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">
            Question Breakdown
          </h2>

          {reportData.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20">
              <Code2 className="w-16 h-16 text-pink-500/30 mx-auto mb-4" />
              <h3 className="text-xl text-white font-semibold mb-2">
                No questions found
              </h3>
              <p className="text-gray-400">
                Complete an interview to see your report here
              </p>
            </div>
          ) : (
            reportData.map((report, index) => (
              <QuestionCard
                key={index}
                index={index}
                report={report}
                isExpanded={expandedQuestions[index]}
                onToggle={() => toggleQuestion(index)}
                getAccuracyColor={getAccuracyColor}
                getAccuracyBg={getAccuracyBg}
                getAccuracyGradient={getAccuracyGradient}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({
  icon,
  label,
  value,
  gradient,
  valueColor = "text-white",
  subValue,
}) => (
  <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl border border-pink-500/20 p-5 hover:border-pink-500/40 transition-all duration-300">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}
    ></div>
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10 text-pink-500`}
        >
          {icon}
        </div>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
    </div>
  </div>
);

// Distribution Bar Component
const DistributionBar = ({ label, count, total, color }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white">
          {count} question{count !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Quick Stat Component
const QuickStat = ({ icon, label, value, unit }) => (
  <div className="bg-gray-800/30 rounded-xl p-4 border border-pink-500/10">
    <div className="flex items-center gap-2 text-pink-500 mb-2">
      {icon}
      <span className="text-xs text-gray-400">{label}</span>
    </div>
    <p className="text-lg font-bold text-white truncate" title={value}>
      {typeof value === "string" && value.length > 15
        ? value.substring(0, 15) + "..."
        : value}
    </p>
    <p className="text-xs text-gray-500">{unit}</p>
  </div>
);

// Question Card Component
const QuestionCard = ({
  index,
  report,
  isExpanded,
  onToggle,
  getAccuracyColor,
  getAccuracyBg,
  getAccuracyGradient,
}) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative">
        {/* Header - Click to expand */}
        <div className="p-6 cursor-pointer" onClick={onToggle}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-400">
                  Question {index + 1}
                </span>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-500 rounded-full text-xs font-medium border border-pink-500/20">
                  {report.topic || "General"}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {report.timeSpent || "2:30"}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white group-hover:text-pink-500 transition-colors">
                {report.question}
              </h3>
            </div>

            {/* Accuracy Badge */}
            <div
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl ${getAccuracyBg(report.accuracy)} border border-pink-500/20`}
            >
              <span className="text-xs text-gray-400">Accuracy</span>
              <span
                className={`text-2xl font-bold ${getAccuracyColor(report.accuracy)}`}
              >
                {report.accuracy}%
              </span>
            </div>
          </div>

          {/* Preview of answer match */}
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div
              className={`w-2 h-2 rounded-full ${
                report.accuracy >= 80
                  ? "bg-green-500"
                  : report.accuracy >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-400">
              {report.accuracy >= 80
                ? "Excellent match"
                : report.accuracy >= 60
                  ? "Good match"
                  : "Needs improvement"}
            </span>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-pink-500/20 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Answer */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-300">
                    Your Answer
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-pink-500/10">
                  <p className="text-gray-300 leading-relaxed">
                    {report.userAnswer || "No answer provided"}
                  </p>
                </div>
              </div>

              {/* Correct Answer */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-300">
                    Expected Answer
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-pink-500/10">
                  <p className="text-gray-300 leading-relaxed">
                    {report.correctAnswer || "No answer provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl border border-pink-500/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Feedback
                  </p>
                  <p className="text-sm text-gray-400">
                    {report.feedback ||
                      "Review the correct answer to improve your understanding."}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Points if available */}
            {report.keyPoints && report.keyPoints.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-white mb-2">
                  Key Points to Remember
                </p>
                <div className="flex flex-wrap gap-2">
                  {report.keyPoints.map((point, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full text-xs border border-pink-500/20"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
