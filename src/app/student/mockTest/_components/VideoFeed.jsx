// student/mockTest/_components/VideoFeed.js
import React from "react";
import {
  Video,
  Camera,
  Smile,
  Frown,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

const VideoFeed = ({
  videoRef,
  canvasRef,
  cameraError,
  isFaceInFrame,
  faceWarning,
  onRetryCamera,
  violations = 0,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
            <Video className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-white">Camera Feed</h3>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${cameraError ? "bg-red-500" : "bg-green-500"}`}
          ></div>
          <span
            className={`text-sm ${cameraError ? "text-red-500" : "text-green-500"}`}
          >
            {cameraError ? "Error" : "Active"}
          </span>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <Camera className="w-12 h-12 text-red-500 mb-3" />
            <p className="text-white font-medium">Camera Access Required</p>
            <p className="text-sm text-gray-400 mt-1">
              Please allow camera access
            </p>
            <button
              onClick={onRetryCamera}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-lg text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-pink-500/25 transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              Retry Camera
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />

            {/* Face Detection Status */}
            <div className="absolute bottom-4 left-4 right-4">
              <div
                className={`
                flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm
                ${
                  isFaceInFrame
                    ? "bg-green-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }
              `}
              >
                {isFaceInFrame ? (
                  <>
                    <Smile className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Face detected - Good position
                    </span>
                  </>
                ) : (
                  <>
                    <Frown className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Please center your face
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Violation Counter */}
            {violations > 0 && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-red-500/90 text-white rounded-lg text-xs">
                <AlertTriangle className="w-3 h-3" />
                <span>{violations}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Warning Message */}
      {faceWarning && !cameraError && (
        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500 w-4 h-4" />
            <div>
              <p className="font-medium text-red-500 text-sm">
                Attention Required
              </p>
              <p className="text-xs text-red-400">
                Please keep your face centered in the frame
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
