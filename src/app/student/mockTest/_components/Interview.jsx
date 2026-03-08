// student/mockTest/_components/Interview.js
"use client";
import React, { useEffect } from "react";
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
import { AlertCircle, Shield, Video, Mic, AlertTriangle } from "lucide-react";

const InterviewPage = ({ setStepCount, questionIdMilGaya }) => {
  const { videoRef, cameraError, startWebcam, setCameraError } = useWebcam();
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
    currentQuestionIndex,
    loading,
    goToNextQuestion,
    endInterview,
    saveQuestion,
  } = useQuestions(questionIdMilGaya, transcript, setStepCount);

  const { violations } = useTabSwitch();

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

  const handleRetryCamera = () => {
    setCameraError(false);
    startWebcam();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          Browser does not support speech recognition.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  React Developer Interview
                </span>
              </h1>
              <p className="text-gray-400 mt-1">Technical Assessment Session</p>
            </div>

            <div className="flex items-center gap-4">
              <Timer seconds={timer} />

              {/* Recording Status */}
              <div
                className={`
                flex items-center gap-2 px-4 py-2 rounded-xl border
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
                <span className="text-sm font-medium">
                  {isRecording ? "Recording" : "Not Recording"}
                </span>
              </div>

              {/* Violation Warning */}
              {violations > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {violations} violations
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - Left Panel */}
          <div className="lg:w-2/3 space-y-6">
            {/* Question Card */}
            <QuestionCard
              currentIndex={currentQuestionIndex}
              totalQuestions={questionData.length}
              question={questionData[currentQuestionIndex]?.question}
              topic={questionData[currentQuestionIndex]?.topic}
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
              disableNext={currentQuestionIndex >= questionData.length - 1}
              saveNext={() => saveQuestion(questionIdMilGaya)}
            />

            {/* End Interview Button */}
            <button
              onClick={() => endInterview(questionIdMilGaya)}
              className="w-full group relative bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25"
            >
              <span className="relative z-10">End Interview Session</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          {/* Video Panel - Right Side */}
          <div className="lg:w-1/3 space-y-6">
            {/* Video Feed Card */}
            <VideoFeed
              videoRef={videoRef}
              canvasRef={canvasRef}
              cameraError={cameraError}
              isFaceInFrame={isFaceInFrame}
              faceWarning={faceWarning}
              onRetryCamera={handleRetryCamera}
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
    </div>
  );
};

export default InterviewPage;
