// student/mockTest/_components/Interview.js
"use client";
import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

import { useWebcam } from "../../../../hooks/useWebcam";
import { useFaceDetection } from "../../../../hooks/useFaceDetection";
import { useTimer } from "../../../../hooks/useTimer";
import { useSpeechRecognition } from "../../../../hooks/useSpeechRecognition";
import { useQuestions } from "../../../../hooks/useQuestions";

import VideoFeed from "./VideoFeed";
import QuestionCard from "./QuestionCard";
import TranscriptCard from "./TranscriptCard";
import GuidelinesCard from "./GuidelinesCard";
import SessionInfo from "./SessionInfo";
import Timer from "./Timer";
import { useTabSwitch } from "@/hooks/usetabSwitch";
import { AlertCircle, AlertTriangle, Loader2 } from "lucide-react";

const InterviewPage = ({ setStepCount, questionIdMilGaya }) => {
  const { videoRef, cameraError, startWebcam, stopWebcam, setCameraError } =
    useWebcam();
  const { canvasRef, isFaceInFrame, faceWarning } = useFaceDetection(
    videoRef,
    !cameraError,
  );
  const { timer, isTimerRunning, startTimer, stopTimer } = useTimer();
  const {
    transcript,
    listening,
    isRecording,
    browserSupportsSpeechRecognition,
    startRecording,
    stopRecording,
    clearTranscript,
  } = useSpeechRecognition();
  const {
    questionData,
    interview,
    currentQuestionIndex,
    loading,
    submitting,
    goToNextQuestion,
    endInterview,
    saveQuestion,
  } = useQuestions(questionIdMilGaya, transcript, setStepCount);

  const { violations } = useTabSwitch();
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  useEffect(() => {
    startWebcam();
  }, [startWebcam]);

  const handleStartRecording = () => {
    startRecording();
    if (!isTimerRunning) {
      startTimer();
    }
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleClearTranscript = () => {
    clearTranscript();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      goToNextQuestion();
      clearTranscript();
      handleStopRecording();
    }
  };

  const handleEndInterview = async () => {
    // Release the camera and mic before handing over to the report step.
    handleStopRecording();
    stopTimer();
    stopWebcam();
    await endInterview(questionIdMilGaya);
  };

  const isLastQuestion = currentQuestionIndex >= questionData.length - 1;
  const technologyLabel = interview?.technology
    ? `${interview.technology} Interview`
    : "Technical Interview";

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl flex items-start gap-3 max-w-md">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Speech recognition unavailable</p>
            <p className="text-sm text-red-400 mt-1">
              This browser does not support speech recognition. Try Chrome or
              Edge on desktop.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Preparing your questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif capitalize">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {technologyLabel}
                </span>
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Technical Assessment Session
                {interview?.experience ? ` • ${interview.experience} years` : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Timer seconds={timer} />

              {/* Recording Status */}
              <div
                className={`
                flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border
                ${
                  isRecording
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-gray-800/50 text-gray-400 border-pink-500/20"
                }
              `}
              >
                <div
                  className={`w-2 h-2 rounded-full ${isRecording ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                ></div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {isRecording ? "Recording" : "Not Recording"}
                </span>
              </div>

              {/* Violation Warning */}
              {violations > 0 && (
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {violations} violations
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - Left Panel */}
          <div className="lg:w-2/3 space-y-6 order-2 lg:order-1">
            {/* Question Card */}
            <QuestionCard
              currentIndex={currentQuestionIndex}
              totalQuestions={questionData.length}
              question={questionData[currentQuestionIndex]?.question}
              topic={interview?.technology}
            />

            {/* Transcript Card */}
            <TranscriptCard
              transcript={transcript}
              listening={listening}
              isRecording={isRecording}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              onClearTranscript={handleClearTranscript}
              onNextQuestion={handleNextQuestion}
              disableNext={isLastQuestion}
              saveNext={saveQuestion}
            />

            {/* End Interview Button */}
            <button
              onClick={() => setShowEndConfirm(true)}
              disabled={submitting}
              className="w-full group relative bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Scoring your answers...
                  </>
                ) : (
                  "End Interview Session"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          {/* Video Panel - Right Side */}
          <div className="lg:w-1/3 space-y-6 order-1 lg:order-2">
            {/* Video Feed Card */}
            <VideoFeed
              videoRef={videoRef}
              canvasRef={canvasRef}
              cameraError={cameraError}
              isFaceInFrame={isFaceInFrame}
              faceWarning={faceWarning}
              onRetryCamera={() => {
                setCameraError(false);
                startWebcam();
              }}
              violations={violations}
            />

            {/* Guidelines Card */}
            <GuidelinesCard />

            {/* Session Info */}
            <SessionInfo
              currentQuestion={currentQuestionIndex}
              totalQuestions={questionData.length}
              isRecording={isRecording}
              cameraError={cameraError}
              isFaceInFrame={isFaceInFrame}
              timer={timer}
              violations={violations}
            />
          </div>
        </div>
      </div>

      {/* Ending mid-interview discards nothing, but it is still irreversible. */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowEndConfirm(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          ></div>

          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6 animate-slideIn">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>

            <h3 className="text-xl font-semibold text-white text-center mb-2">
              End this interview?
            </h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              Your answers will be scored and you will not be able to return to
              these questions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 px-4 py-3 border border-pink-500/20 rounded-xl text-gray-300 font-medium hover:bg-pink-500/10 transition-colors"
              >
                Keep going
              </button>
              <button
                onClick={() => {
                  setShowEndConfirm(false);
                  handleEndInterview();
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-600 transition-all"
              >
                End interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
