// student/mockTest/_components/SessionInfo.js
import React from "react";
import {
  Clock,
  Camera,
  Mic,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const SessionInfo = ({
  currentQuestion,
  totalQuestions,
  isRecording,
  cameraError,
  isFaceInFrame,
  timer,
  violations = 0,
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-semibold text-white">Session Information</h4>
      </div>

      <div className="space-y-4">
        {/* Progress */}
        <InfoRow
          icon={<Clock className="w-4 h-4" />}
          label="Questions Completed"
          value={`${currentQuestion + 1}/${totalQuestions}`}
          valueColor="text-pink-500"
        />

        {/* Recording Status */}
        <InfoRow
          icon={<Mic className="w-4 h-4" />}
          label="Recording Status"
          value={isRecording ? "Active" : "Inactive"}
          valueColor={isRecording ? "text-green-500" : "text-gray-400"}
          status={
            isRecording ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <XCircle className="w-3 h-3 text-red-500" />
            )
          }
        />

        {/* Camera Status */}
        <InfoRow
          icon={<Camera className="w-4 h-4" />}
          label="Camera Status"
          value={cameraError ? "Error" : "Active"}
          valueColor={cameraError ? "text-red-500" : "text-green-500"}
          status={
            !cameraError ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <XCircle className="w-3 h-3 text-red-500" />
            )
          }
        />

        {/* Face Detection */}
        <InfoRow
          icon={<Eye className="w-4 h-4" />}
          label="Face Detection"
          value={isFaceInFrame ? "Detected" : "Needs Attention"}
          valueColor={isFaceInFrame ? "text-green-500" : "text-yellow-500"}
          status={
            isFaceInFrame ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-yellow-500" />
            )
          }
        />

        {/* Session Duration */}
        <InfoRow
          icon={<Clock className="w-4 h-4" />}
          label="Session Duration"
          value={formatTime(timer)}
          valueColor="text-pink-500"
        />

        {/* Violations */}
        {violations > 0 && (
          <InfoRow
            icon={<AlertTriangle className="w-4 h-4" />}
            label="Violations"
            value={violations.toString()}
            valueColor="text-red-500"
            status={<AlertTriangle className="w-3 h-3 text-red-500" />}
          />
        )}
      </div>

      {/* Warning if face not detected */}
      {!isFaceInFrame && !cameraError && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-yellow-500 flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" />
            Please ensure your face is visible for proctoring
          </p>
        </div>
      )}
    </div>
  );
};

// Info Row Component
const InfoRow = ({ icon, label, value, valueColor = "text-white", status }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-pink-500">{icon}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${valueColor}`}>{value}</span>
      {status}
    </div>
  </div>
);

export default SessionInfo;
