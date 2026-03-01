"use client";
import React, { useEffect } from "react";
import "regenerator-runtime/runtime";

import { useWebcam } from "../../../../hooks/useWebcam";
import { useFaceDetection } from "../../../../hooks/useFaceDetection";
import { useTimer } from "../../../../hooks/useTimer";
import { useSpeechRecognition } from "../../../../hooks/useSpeechRecognition";
import { useQuestions } from "../../../../hooks/useQuestions";

import VideoFeed from "../_components/VideoFeed";
import QuestionCard from "../_components/QuestionCard";
import TranscriptCard from "../_components/TranscriptCard";
import GuidelinesCard from "../_components/GuidelinesCard";
import SessionInfo from "../_components/SessionInfo";
import Timer from "../_components/Timer";
import { useTabSwitch } from "@/hooks/usetabSwitch";

const InterviewPage = ({ setStepCount, questionIdMilGaya }) => {
  // Custom hooks
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

  const { voilations } = useTabSwitch();

  // Start webcam on mount
  useEffect(() => {
    startWebcam();
  }, [startWebcam]);

  // Handle recording state
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
      <div className="h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          Browser does not support speech recognition.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                React Developer Interview
              </h1>
              <p className="text-gray-600 mt-1">Technical Assessment Session</p>
            </div>
            <div className="flex items-center gap-4">
              <Timer seconds={timer} />
              <div
                className={`px-4 py-2 rounded-full font-medium ${
                  isRecording
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isRecording ? "Recording" : "Not Recording"}
              </div>
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
              saveNext={saveQuestion}
            />

            {/* End Interview Button */}
            <button
              onClick={() => endInterview(questionIdMilGaya)}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              End Interview Session
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
