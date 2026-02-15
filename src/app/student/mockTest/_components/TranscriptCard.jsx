import React from "react";
import { IoMdMic } from "react-icons/io";
import { BsMicMuteFill } from "react-icons/bs";

const TranscriptCard = ({
  transcript,
  listening,
  isRecording,
  onStartRecording,
  onStopRecording,
  onClearTranscript,
  onNextQuestion,
  disableNext,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Live Transcript</h3>
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
            <p className="text-sm mt-2">Start recording to see transcript</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onStartRecording}
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
          onClick={onStopRecording}
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
          onClick={onClearTranscript}
          className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
        >
          Clear Transcript
        </button>

        <button
          onClick={onNextQuestion}
          disabled={disableNext}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
            disableNext
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Next Question
          <span className="text-sm">→</span>
        </button>
      </div>
    </div>
  );
};

export default TranscriptCard;
