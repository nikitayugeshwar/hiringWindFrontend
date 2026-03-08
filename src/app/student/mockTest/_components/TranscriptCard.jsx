// student/mockTest/_components/TranscriptCard.js
import React from "react";
import { Mic, MicOff, FileText, ArrowRight, Save, Trash2 } from "lucide-react";

const TranscriptCard = ({
  transcript,
  listening,
  isRecording,
  onStartRecording,
  onStopRecording,
  onClearTranscript,
  onNextQuestion,
  disableNext,
  saveNext,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Live Transcript</h3>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${listening ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
          ></div>
          <span className="text-sm text-gray-400">
            {listening ? "Recording" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Transcript Area */}
      <div className="bg-black/50 rounded-xl p-4 h-48 overflow-y-auto border border-pink-500/10 custom-scrollbar">
        {transcript ? (
          <p className="text-gray-300 leading-relaxed">{transcript}</p>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Mic className="w-10 h-10 mb-3 text-pink-500/30" />
            <p className="text-sm">Your speech will appear here...</p>
            <p className="text-xs mt-2">Start recording to see transcript</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
        <ActionButton
          onClick={onStartRecording}
          disabled={listening}
          active={!listening}
          icon={<Mic className="w-4 h-4" />}
          text="Record"
          gradient="from-pink-600 to-pink-400"
        />

        <ActionButton
          onClick={onStopRecording}
          disabled={!listening}
          active={listening}
          icon={<MicOff className="w-4 h-4" />}
          text="Stop"
          gradient="from-red-600 to-red-500"
        />

        <ActionButton
          onClick={onClearTranscript}
          icon={<Trash2 className="w-4 h-4" />}
          text="Clear"
          gradient="from-gray-600 to-gray-500"
        />

        <ActionButton
          onClick={onNextQuestion}
          disabled={disableNext}
          icon={<ArrowRight className="w-4 h-4" />}
          text="Next"
          gradient="from-green-600 to-green-500"
        />

        {disableNext && (
          <ActionButton
            onClick={saveNext}
            icon={<Save className="w-4 h-4" />}
            text="Save"
            gradient="from-blue-600 to-blue-500"
          />
        )}
      </div>
    </div>
  );
};

// Action Button Component
const ActionButton = ({
  onClick,
  disabled,
  icon,
  text,
  gradient,
  active = true,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      group relative overflow-hidden rounded-lg py-2 px-3
      ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-gray-800"
          : `bg-gradient-to-r ${gradient} hover:shadow-lg hover:shadow-${gradient.split(" ")[1]}/25`
      }
      transition-all duration-300
    `}
  >
    <span className="relative z-10 flex items-center justify-center gap-1 text-white text-xs sm:text-sm">
      {icon}
      <span className="hidden sm:inline">{text}</span>
    </span>
    {!disabled && (
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
      ></div>
    )}
  </button>
);

export default TranscriptCard;
