// student/mockTest/_components/GuidelinesCard.js
import React from "react";
import { AlertCircle, Camera, Mic, Eye, Move, Zap, Shield } from "lucide-react";

const GuidelinesCard = () => {
  const guidelines = [
    {
      icon: <Camera className="w-4 h-4" />,
      text: "Ensure good lighting on your face",
    },
    {
      icon: <Move className="w-4 h-4" />,
      text: "Keep your face centered in the camera frame",
    },
    {
      icon: <Mic className="w-4 h-4" />,
      text: "Speak clearly and at a moderate pace",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      text: "Answer each question before proceeding",
    },
    {
      icon: <Eye className="w-4 h-4" />,
      text: "Maintain eye contact with the camera",
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Don't switch tabs during interview",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
          <AlertCircle className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-semibold text-white">Interview Guidelines</h4>
      </div>

      <div className="space-y-3">
        {guidelines.map((item, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="mt-0.5 text-pink-500 group-hover:text-pink-400 transition-colors">
              {item.icon}
            </div>
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Warning Note */}
      <div className="mt-4 pt-4 border-t border-pink-500/20">
        <p className="text-xs text-yellow-500/80 flex items-center gap-2">
          <AlertCircle className="w-3 h-3" />
          Violations may result in interview termination
        </p>
      </div>
    </div>
  );
};

export default GuidelinesCard;
