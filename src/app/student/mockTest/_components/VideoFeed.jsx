import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaRegSmile, FaRegFrown } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";

const VideoFeed = ({
  videoRef,
  canvasRef,
  cameraError,
  isFaceInFrame,
  faceWarning,
  onRetryCamera,
}) => {
  return (
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
              onClick={onRetryCamera}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
            >
              Retry Camera
            </button>
          </div>
        ) : (
          <>
            <div className="relative w-full h-64">
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

      {faceWarning && !cameraError && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <AiOutlineWarning className="text-red-600 text-xl" />
            <div>
              <p className="font-medium text-red-800">Attention Required</p>
              <p className="text-sm text-red-600">
                Please keep your face centered in the frame for proper
                detection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
