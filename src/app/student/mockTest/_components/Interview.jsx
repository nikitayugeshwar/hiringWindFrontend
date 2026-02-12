"use client";
import React, { useState, useEffect, useRef } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IoMdMic } from "react-icons/io";
import { BsMicMuteFill, BsCameraVideoFill } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import { FaRegSmile, FaRegFrown } from "react-icons/fa";

const Interview = ({ setStepCount }) => {
  const [count, setCount] = useState(0);
  const [isFaceInFrame, setIsFaceInFrame] = useState(true);
  const [faceWarning, setFaceWarning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const questions = [
    { question: "What is React and its core principles?" },
    { question: "Explain React hooks and their common use cases" },
    { question: "What is state management in React?" },
    { question: "How does React Router work?" },
    { question: "Explain Virtual DOM and its benefits" },
    { question: "What is JSX and how does it differ from HTML?" },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Simple face detection using canvas analysis
  const detectFaceSimple = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.videoWidth === 0 || !streamRef.current) {
      animationFrameRef.current = requestAnimationFrame(detectFaceSimple);
      return;
    }

    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match video
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame to canvas (scaled to fit)
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const canvasAspectRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (videoAspectRatio > canvasAspectRatio) {
      // Video is wider than canvas
      drawHeight = canvas.height;
      drawWidth = video.videoWidth * (drawHeight / video.videoHeight);
      offsetX = -(drawWidth - canvas.width) / 2;
      offsetY = 0;
    } else {
      // Video is taller than canvas
      drawWidth = canvas.width;
      drawHeight = video.videoHeight * (drawWidth / video.videoWidth);
      offsetX = 0;
      offsetY = -(drawHeight - canvas.height) / 2;
    }

    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

    // Get image data from the center region for face detection
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const sampleSize = 100;

    const imageData = ctx.getImageData(
      centerX - sampleSize / 2,
      centerY - sampleSize / 2,
      sampleSize,
      sampleSize,
    );
    const data = imageData.data;

    // Simple face detection based on skin tone detection
    let facePixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Simple skin tone detection (adjust thresholds as needed)
      if (
        r > 100 &&
        g > 40 &&
        b > 20 &&
        r > g &&
        r > b &&
        Math.abs(r - g) > 20 &&
        r - Math.min(g, b) > 20
      ) {
        facePixels++;
      }
    }

    // Calculate face coverage percentage in the sampled region
    const samplePixels = sampleSize * sampleSize;
    const faceCoverage = (facePixels / samplePixels) * 100;

    // Check if face is detected
    if (faceCoverage > 10) {
      // At least 10% of sampled region has skin tones
      setIsFaceInFrame(true);
      setFaceWarning(false);

      // Draw face bounding box (simulated)
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 3;
      ctx.strokeRect(centerX - 100, centerY - 100, 200, 200);

      // Draw center dot
      ctx.fillStyle = "#00ff00";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      setIsFaceInFrame(false);
      setFaceWarning(true);

      // Draw warning box
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(centerX - 100, centerY - 100, 200, 200);
      ctx.setLineDash([]);

      // Draw center dot
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draw warning text
      ctx.fillStyle = "#ff0000";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("FACE NOT DETECTED", centerX, centerY - 120);
    }

    animationFrameRef.current = requestAnimationFrame(detectFaceSimple);
  };

  // Start webcam
  const startWebcam = async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Start playing the video
        await videoRef.current.play();

        // Start face detection after video is playing
        setTimeout(() => {
          detectFaceSimple();
        }, 500);
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setCameraError(true);
      setIsFaceInFrame(true); // Set to true to prevent constant warnings
      setFaceWarning(false);
    }
  };

  // Timer management
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsRecording(true);
    setIsTimerRunning(true);
    resetTranscript();
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setIsTimerRunning(false);
  };

  const handleNextQuestion = () => {
    if (count < questions.length - 1) {
      setCount(count + 1);
      resetTranscript();
      stopRecording();
    }
  };

  // Start webcam on component mount
  useEffect(() => {
    startWebcam();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

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
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                {formatTime(timer)}
              </div>
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
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                    {count + 1}
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Question</span>
                    <p className="font-medium">
                      {count + 1} of {questions.length}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                  React - Intermediate Level
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {questions[count].question}
                </h2>
                <p className="text-gray-600">
                  Please provide a clear and concise answer. Speak naturally as
                  you would in a real interview scenario. Your answer will be
                  recorded and analyzed.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>
                    {Math.round(((count + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${((count + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Transcript Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Live Transcript
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${listening ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  <span className="text-sm text-gray-600">
                    {listening ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto border border-gray-200">
                {transcript ? (
                  <p className="text-gray-800 leading-relaxed">{transcript}</p>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <IoMdMic className="text-4xl mb-3" />
                    <p>Your speech will appear here...</p>
                    <p className="text-sm mt-2">
                      Start recording to see transcript
                    </p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={startRecording}
                  disabled={listening}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                    listening
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <IoMdMic className="text-lg" />
                  {listening ? "Recording..." : "Start Recording"}
                </button>

                <button
                  onClick={stopRecording}
                  disabled={!listening}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                    !listening
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  <BsMicMuteFill className="text-lg" />
                  Stop Recording
                </button>

                <button
                  onClick={resetTranscript}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
                >
                  Clear Transcript
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={count >= questions.length - 1}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                    count >= questions.length - 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  Next Question
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>

            {/* End Interview Button */}
            <button
              onClick={() => setStepCount(3)}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              End Interview Session
            </button>
          </div>

          {/* Video Panel - Right Side */}
          <div className="lg:w-1/3 space-y-6">
            {/* Video Feed Card */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Camera Feed</h3>
                <div className="flex items-center gap-2">
                  <BsCameraVideoFill
                    className={`${cameraError ? "text-red-600" : "text-blue-600"}`}
                  />
                  <span
                    className={`text-sm ${cameraError ? "text-red-600" : "text-gray-600"}`}
                  >
                    {cameraError ? "Camera Error" : "Active"}
                  </span>
                </div>
              </div>

              <div className="relative bg-black rounded-lg overflow-hidden">
                {cameraError ? (
                  <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-800 text-white">
                    <BsCameraVideoFill className="text-4xl mb-3 text-red-500" />
                    <p className="font-medium">Camera Access Required</p>
                    <p className="text-sm text-gray-300 mt-1">
                      Please allow camera access
                    </p>
                    <button
                      onClick={startWebcam}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                    >
                      Retry Camera
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full h-64">
                      {/* Video element is now visible and plays the live feed */}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                        style={{ transform: "scaleX(-1)" }} // Mirror the video for selfie view
                      />
                      {/* Canvas overlay for face detection drawings */}
                      <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      />

                      {/* Face Status Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                            isFaceInFrame
                              ? "bg-green-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }`}
                        >
                          {isFaceInFrame ? (
                            <>
                              <FaRegSmile className="text-lg" />
                              <span className="text-sm font-medium">
                                Face detected - Good position
                              </span>
                            </>
                          ) : (
                            <>
                              <FaRegFrown className="text-lg" />
                              <span className="text-sm font-medium">
                                Please center your face in frame
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Face Warning */}
              {faceWarning && !cameraError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <AiOutlineWarning className="text-red-600 text-xl" />
                    <div>
                      <p className="font-medium text-red-800">
                        Attention Required
                      </p>
                      <p className="text-sm text-red-600">
                        Please keep your face centered in the frame for proper
                        detection.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guidelines Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <AiOutlineWarning />
                Interview Guidelines
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Ensure good lighting on your face</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Keep your face centered in the camera frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Speak clearly and at a moderate pace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Answer each question before proceeding to next</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>You can pause and resume recording as needed</span>
                </li>
              </ul>
            </div>

            {/* Session Info */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-800 mb-3">
                Session Information
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Completed</span>
                  <span className="font-medium">
                    {count + 1}/{questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Status</span>
                  <span
                    className={`font-medium ${isRecording ? "text-green-600" : "text-gray-600"}`}
                  >
                    {isRecording ? "Recording Active" : "Not Recording"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Camera Status</span>
                  <span
                    className={`font-medium ${cameraError ? "text-red-600" : "text-green-600"}`}
                  >
                    {cameraError ? "Error" : "Active"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Face Detection</span>
                  <span
                    className={`font-medium ${isFaceInFrame ? "text-green-600" : "text-red-600"}`}
                  >
                    {isFaceInFrame ? "✓ Detected" : "⚠ Needs Attention"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Duration</span>
                  <span className="font-medium">{formatTime(timer)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
